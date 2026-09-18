from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    priority: str = "Medium"
    due_date: Optional[datetime] = None
    assigned_to: str = "Virtual HR"

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    status: str

class TaskResponse(TaskBase):
    id: int
    status: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
