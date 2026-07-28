from fastapi import FastAPI

from . import models
from .database import engine
from .routers import post, user, auth, vote
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "https://google.com",
    "http://172.28.14.38:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#this is not needed because we are using alembic for migrations
# models.Base.metadata.create_all(bind=engine)
@app.get("/")
def get_posts():
    return {"message": "Hello World"}

app.include_router(post.router)
app.include_router(user.router)
app.include_router(auth.router)
app.include_router(vote.router)


# @app.post("/token")
# def login_for_access_token(
#     form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
# ) -> schemas.Token:
#     user = utils.authenticate_user(database.get_db], form_data.username, form_data.password)
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     access_token = create_access_token(
#         data={"sub": user.username}, expires_delta=access_token_expires
#     )
#     return schemas.Token(access_token=access_token, token_type="bearer")
# @app.get("/items/")
# async def read_items(token: Annotated[str, Depends(oauth2_scheme)]):
#     return {"token": token}


