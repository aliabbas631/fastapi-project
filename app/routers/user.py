from .. import schemas, models
from fastapi import FastAPI, HTTPException, status, Response, Depends, APIRouter
from sqlalchemy.orm import Session
from ..database import get_db
from typing import Annotated
from .. import utils
router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_user(user: schemas.UserCreate, db: Annotated[Session, Depends(get_db)]):
    user_dict = user.model_dump()
    if user_dict['email'] in [u.email for u in db.query(models.User).all()]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"User with email {user_dict['email']} already exists")
    user_dict['password'] = utils.hash_password(user_dict['password'])
    new_user = models.User(**user_dict)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.get("/{id}")
def get_user(id: int, db: Annotated[Session, Depends(get_db)]):
    user = db.query(models.User).filter(models.User.id == id).first()

    if not user:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = f"user with id {id} does not exist")
    return user
