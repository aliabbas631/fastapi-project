from typing import Annotated

from pydantic import BaseModel, ConfigDict, EmailStr as email_str, Field 
from datetime import datetime

class UserCreate(BaseModel):
    email: email_str
    password: str

class UserResp(UserCreate):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

    # old version of psycopg2:
    # class Config:
    #     orm_mode = True


class PostBase(BaseModel):
    title: str
    content: str
    published: bool = True
 
class PostResp(PostBase):
    created_at: datetime
    id: int
    owner_id: int
    owner: UserResp

    model_config = ConfigDict(from_attributes=True)

    # old version of psycopg2:    
    # class Config:
    #     orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: int | None = None

class Vote(BaseModel):
    post_id: int
    dir: Annotated[int, Field(ge=0, le=1)]

