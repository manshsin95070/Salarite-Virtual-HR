from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.interview import Interview
from app.schemas.interview import InterviewCreate, InterviewResponse
import logging

router = APIRouter(prefix="/interviews", tags=["Interviews"])

logger = logging.getLogger(__name__)

@router.post("", response_model=InterviewResponse)
def create_interview(interview: InterviewCreate, db: Session = Depends(get_db)):
    try:
        new_interview = Interview(**interview.model_dump())
        db.add(new_interview)
        db.commit()
        db.refresh(new_interview)
        return new_interview
    except Exception as e:
        logger.error(f"Error creating interview: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("", response_model=List[InterviewResponse])
def get_interviews(db: Session = Depends(get_db)):
    return db.query(Interview).order_by(Interview.created_at.desc()).all()
