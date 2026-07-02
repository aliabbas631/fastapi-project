from .. import schemas, models, oauth2
from fastapi import FastAPI, HTTPException, status, Response, Depends, APIRouter
from sqlalchemy.orm import Session
from ..database import get_db
from typing import Annotated


router = APIRouter( prefix="/vote", tags=["votes"])

@router.post('/')
def vote(v: schemas.Vote, db: Annotated[Session, Depends(get_db)], current_user: Annotated[models.User, Depends(oauth2.get_current_user)]):
    post = db.query(models.Post).filter(models.Post.id == v.post_id).first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"post with id {v.post_id} not found")
    exist = db.query(models.Vote).filter(models.Vote.post_id == v.post_id, models.Vote.user_id == current_user.id).first()
    if v.dir:
        if exist:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"user {current_user.id} has already voted on post {v.post_id}")
        new_vote = models.Vote(post_id = v.post_id, user_id = current_user.id)
        db.add(new_vote)
        db.commit()
        db.refresh(new_vote)
        return {"message": "vote added successfully"}
    else:
        if not exist:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"user {current_user.id} has not voted on post {v.post_id}")
        db.query(models.Vote).filter(models.Vote.post_id == v.post_id, models.Vote.user_id == current_user.id).delete(synchronize_session=False)
        db.commit()
        return {"message": "vote removed successfully"}