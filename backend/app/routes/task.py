from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskResponse, TaskUpdate
import logging

router = APIRouter(prefix="/tasks", tags=["Tasks"])

logger = logging.getLogger(__name__)

@router.post("", response_model=TaskResponse)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    try:
        new_task = Task(**task.model_dump())
        db.add(new_task)
        db.commit()
        db.refresh(new_task)
        return new_task
    except Exception as e:
        logger.error(f"Error creating task: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("", response_model=List[TaskResponse])
def get_tasks(db: Session = Depends(get_db)):
    return db.query(Task).order_by(Task.created_at.desc()).all()

@router.put("/{task_id}", response_model=TaskResponse)
def update_task_status(task_id: int, task_update: TaskUpdate, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    task.status = task_update.status
    db.commit()
    db.refresh(task)
    return task
