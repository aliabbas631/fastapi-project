from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import dburl
SQLALCHEMY_DATABASE_URL = f'{dburl.DATABASE_URL}'

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



# import psycopg2
# from psycopg2.extras import RealDictCursor
# import time
# # database connection for cursor only
# while True:
#     try:
#         conn = psycopg2.connect(host='localhost', database='fastapi', user='postgres', password='postgres#alloush', cursor_factory=RealDictCursor)
#         cursor = conn.cursor()
#         print("Database connection was successful!")
#         break 
#     except Exception as e:
#         print(f"Error connecting to database: {e}")
#         time.sleep(2)