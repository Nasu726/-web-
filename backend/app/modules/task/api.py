# backend/app/modules/task/api.py

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core import database, security
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.modules.user.models import User
from app.modules.group import crud as group_crud

from . import crud, schemas, models

router = APIRouter(
    prefix="/groups/{group_id}/tasks",
    tags=["Tasks"]
)

def check_group_member(db: Session, group_id: str, user_id: str):
    """グループメンバーか確認する共通関数"""
    member = group_crud.get_user_group(db, user_id, group_id)
    if not member or not member.accepted:
        raise HTTPException(status_code=403, detail="Not a group member")

# --- タスク基本 CRUD ---

@router.post("/", response_model=schemas.TaskResponse)
def create_task(
    group_id: str,
    task_in: schemas.TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """タスクを作成し、作成者を自動的にメンバーに追加する"""
    check_group_member(db, group_id, current_user.user_id)
    
    # 1. タスク作成
    new_task = crud.create_task(db, task_in, group_id)
    
    # 2. 作成者を自動的に関連付け (イベントなら参加、タスクなら未定などで登録)
    crud.add_user_to_task(
        db, 
        task_id=new_task.task_id, 
        user_id=current_user.user_id,
        is_assigned=False # 作成＝担当者とは限らないのでFalse
    )
    
    return new_task

@router.get("/", response_model=List[schemas.TaskResponse])
def read_tasks(
    group_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    check_group_member(db, group_id, current_user.user_id)
    return crud.get_tasks_by_group(db, group_id)

@router.get("/{task_id}", response_model=schemas.TaskResponse)
def read_task_detail(
    group_id: str,
    task_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    check_group_member(db, group_id, current_user.user_id)
    task = crud.get_task(db, task_id, group_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.put("/{task_id}", response_model=schemas.TaskResponse)
def update_task(
    group_id: str,
    task_id: str,
    task_in: schemas.TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    check_group_member(db, group_id, current_user.user_id)
    task = crud.get_task(db, task_id, group_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return crud.update_task(db, task, task_in)

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    group_id: str,
    task_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    check_group_member(db, group_id, current_user.user_id)
    task = crud.get_task(db, task_id, group_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    crud.delete_task(db, task)
    return

# --- 参加・リアクション関連 ---

@router.post("/{task_id}/join", response_model=schemas.TaskUserRelationResponse)
def join_task(
    group_id: str,
    task_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """ログインユーザーがこのタスク/イベントに参加リスト入りする"""
    check_group_member(db, group_id, current_user.user_id)
    
    # タスク存在確認
    task = crud.get_task(db, task_id, group_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # 既に参加済みか確認
    relation = crud.get_relation(db, task_id, current_user.user_id)
    if relation:
        return relation # 既にあればそれを返す
    
    # 新規追加
    return crud.add_user_to_task(db, task_id, current_user.user_id)

@router.put("/{task_id}/reaction", response_model=schemas.TaskUserRelationResponse)
def update_my_reaction(
    group_id: str,
    task_id: str,
    relation_in: schemas.TaskUserRelationUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """自分のリアクション（参加/不参加/コメント）を更新する"""
    check_group_member(db, group_id, current_user.user_id)
    
    relation = crud.get_relation(db, task_id, current_user.user_id)
    if not relation:
        raise HTTPException(status_code=404, detail="Not joined to this task yet")
    
    return crud.update_relation(db, relation, relation_in)
