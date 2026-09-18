from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routes import task, interview
import os
from dotenv import load_dotenv

load_dotenv()

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Salarite Virtual HR API")

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    os.getenv("FRONTEND_URL", "*")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Since it's a test assignment, allow all for simplicity or use specific ones
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(task.router)
app.include_router(interview.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Salarite Virtual HR API"}
