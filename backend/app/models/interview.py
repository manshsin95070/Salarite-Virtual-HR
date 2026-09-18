from sqlalchemy import Column, Integer, String, Text, DateTime, Date, Time
from sqlalchemy.sql import func
from app.database import Base

class Interview(Base):
    __tablename__ = "interviews"

    id = Column(Integer, primary_key=True, index=True)
    candidate_name = Column(String(255), nullable=False)
    candidate_email = Column(String(255), nullable=False)
    interview_date = Column(Date, nullable=False)
    interview_time = Column(Time, nullable=False)
    mode = Column(String(50), nullable=False) # Voice, Video, Chat
    status = Column(String(50), nullable=False, default="Scheduled")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
