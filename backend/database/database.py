from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine 
import os 
from dotenv import load_dotenv

load_dotenv()

DB_url = os.getenv("DATABASE_URL")

engine = create_engine(DB_url)

session_local = sessionmaker(
    bind=engine ,
    autocommit = False , 
    autoflush=False
)

