from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

from app.modules.user.schemas import UserResponse # ユーザー情報を表示するために必要

# --- 中間テーブル (Relation) 用のスキーマ ---

class TaskUserRelationBase(BaseModel):
    is_assigned: bool = False
    reaction: str = "no-reaction"
    comment: Optional[str] = None

class TaskUserRelationUpdate(BaseModel):
    """ユーザーが自分のリアクションやコメントを更新する用"""
    reaction: Optional[str] = None
    comment: Optional[str] = None
    is_assigned: Optional[bool] = None

class TaskUserRelationResponse(TaskUserRelationBase):
    """タスク詳細に含まれるメンバー情報"""
    relation_id: str
    user_id: str
    user: Optional[UserResponse] = None # 誰のリアクションかを表示するため

    class Config:
        from_attributes = True

# --- タスク本体 (Task) 用のスキーマ ---

class TaskBase(BaseModel):
    title: str
    date: datetime
    time_span_begin: Optional[datetime] = None
    time_span_end: Optional[datetime] = None
    location: Optional[str] = None
    description: Optional[str] = None
    is_task: bool = False
    status: str

class TaskCreate(TaskBase):
    """タスク作成時に受け取るデータ"""
    pass

class TaskUpdate(BaseModel):
    """タスク更新用 (全てOptional)"""
    title: Optional[str] = None
    date: Optional[datetime] = None
    time_span_begin: Optional[datetime] = None
    time_span_end: Optional[datetime] = None
    location: Optional[str] = None
    description: Optional[str] = None
    is_task: Optional[bool] = None
    status: Optional[str] = None

class TaskResponse(TaskBase):
    """クライアントに返すタスクデータ"""
    task_id: str
    group_id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    # 関連するユーザー（担当者や参加者）のリストを含める
    task_user_relations: List[TaskUserRelationResponse] = []

    class Config:
        from_attributes = True