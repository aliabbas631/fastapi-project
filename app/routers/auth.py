from fastapi import FastAPI, HTTPException, status, Response, Depends, APIRouter
from sqlalchemy.orm import Session

from datetime import timedelta
from .. import schemas, models, utils, oauth2
from ..database import get_db
from typing import Annotated
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter( tags=["Authentication"])

from ..config import settings

ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_minutes

# router.post("/login")
# def login(db: Annotated[Session, Depends(get_db)], user_credentials: schemas.UserCreate ):
#     user_dict = user_credentials.model_dump()
#     user = db.query(models.User).filter(models.User.email == user_dict['email']).first()

#     if not utils.authenticate_user(user_dict, user):
#         raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid credentials")
    

#     return {"token": "fake token"}

@router.post("/token", response_model=schemas.Token)
def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Annotated[Session, Depends(get_db)]
) -> schemas.Token:
    
    #OAuth2PasswordRequestForm has the following : 
    #username, password, grant_type	(Usually "password" for this flow)
    # scope:	Optional permissions string
    # client_id:	Optional client identifier
    # client_secret:	Optional client secret

    user = oauth2.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    access_token = oauth2.create_access_token(
        data={"user_id": user.id}, expires_delta=access_token_expires
    )
    return schemas.Token(access_token=access_token, token_type="bearer")