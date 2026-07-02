from datetime import datetime, timedelta, timezone
from typing import Annotated
from sqlalchemy.orm import Session 

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jwt.exceptions import InvalidTokenError
from pydantic import BaseModel
from . import schemas, models, utils
from .database import get_db
# u can create keys from this command: python -c "import secrets; print(secrets.token_hex(32))"

from .config import settings

SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_user(db: Session, username: str):
    return db.query(models.User).filter(models.User.email == username).first()


def authenticate_user(db: Session, username: str, password: str) -> schemas.UserCreate | None:
    user = get_user(db, username=username)
    if not user:
        utils.verify_password(password, utils.DUMMY_HASH)
        return None
    if utils.verify_password(password, user.password):
        return user
    return None


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_access_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("user_id")
        if user_id is None:
            raise credentials_exception
        token_data = schemas.TokenData(id=user_id)
        token_data = token_data.model_dump()
    except InvalidTokenError:
        raise credentials_exception
    return token_data["id"]


def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: Annotated[Session, Depends(get_db)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    id =  verify_access_token(token, credentials_exception)
    user = db.query(models.User).filter(models.User.id == id).first() 
    if not user:
        raise credentials_exception
    return user