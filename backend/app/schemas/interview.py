from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date, time, datetime

class InterviewBase(BaseModel):
    candidate_name: str
    candidate_email: EmailStr
    interview_date: date
    interview_time: time
    mode: str 

class InterviewCreate(InterviewBase):
    pass

class InterviewResponse(InterviewBase):
    id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
