from .. import schemas, models, oauth2
from fastapi import FastAPI, HTTPException, status, Response, Depends, APIRouter
from sqlalchemy.orm import Session
from ..database import get_db
from typing import Annotated, List


router = APIRouter( prefix="/posts", tags=["posts"])
# get requests
@router.get("/", response_model=List[schemas.PostResp])
def get_posts(db: Annotated[Session, Depends(get_db)], current_user: Annotated[models.User, Depends(oauth2.get_current_user)]):
    # cursor.execute("""SELECT * FROM posts""")
    # posts = cursor.fetchall()

    posts = db.query(models.Post).all()
    return posts

@router.get("/{id}", response_model=schemas.PostResp)
def get_post(id: int, db: Annotated[Session, Depends(get_db)], current_user: Annotated[models.User, Depends(oauth2.get_current_user)]):
    # cursor.execute("""SELECT * FROM posts WHERE id = %s""", (str(id),))
    # post = cursor.fetchone() 

    post = db.query(models.Post).filter(models.Post.id == id).first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Post with id {id} not found")
    
    return post
    
# post request
@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.PostResp)
def create_post(post: schemas.PostBase, db: Annotated[Session, Depends(get_db)], current_user: Annotated[models.User, Depends(oauth2.get_current_user)]):
    # cursor.execute("""INSERT INTO posts (title, content, published) VALUES (%s, %s, %s) RETURNING *""", (post.title, post.content, post.published))
    # new_post = cursor.fetchone()
    # conn.commit()
    post_dict = post.model_dump()
    current_user_id = current_user.id
    post_dict['owner_id'] = current_user_id
    new_post = models.Post(**post_dict)
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

# delete request
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int, db: Annotated[Session, Depends(get_db)], current_user: Annotated[models.User, Depends(oauth2.get_current_user)]):
    # cursor.execute("""DELETE FROM posts WHERE id = %s RETURNING *""", (str(id),))
    # deleted_post = cursor.fetchone() 
    # conn.commit()
    current_user_id = current_user.id
    post_query = db.query(models.Post).filter(models.Post.id == id)
    if post_query.first() == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Post with id {id} not found")
    if current_user_id != post_query.first().owner_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"You are not authorized to perform this action")
    post_query.delete(synchronize_session=False)
    db.commit()

# update request (PUT)
@router.put("/{id}", response_model=schemas.PostResp)
def update_post(id: int, post: schemas.PostBase, current_user: Annotated[models.User, Depends(oauth2.get_current_user)], db: Annotated[Session, Depends(get_db)]):
    # cursor.execute("""UPDATE posts SET title = %s, content = %s, published = %s WHERE id = %s RETURNING *""", (post.title, post.content, post.published, str(id)))
    # updated_post = cursor.fetchone()
    # conn.commit()
    post_query = db.query(models.Post).filter(models.Post.id == id)
    if post_query.first()== None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Post with id {id} not found")
    if current_user.id != post_query.first().owner_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"You are not authorized to perform this action")
    post_query.update(post.model_dump(), synchronize_session=False)
    db.commit()
    return  post_query.first()