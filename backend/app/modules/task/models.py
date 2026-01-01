# backend/app/modules/task/models.py

import uuid
from sqlalchemy import Column, String, Text, Boolean, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Task(Base):
    """
    【Taskテーブル定義】
    タスクの基本情報を管理します。
    MySQLのテーブル定義と一致させる必要があります。
    """

    __tablename__ = "tasks"

    task_id = Column(String(36), primary_key=True,  default=lambda: str(uuid.uuid4()), index=True)

    group_id = Column(String(36), ForeignKey("groups.group_id", ondelete="CASCADE"), nullable=False, index=True)

    title = Column(String(255), nullable=False)

    date = Column(DateTime, nullable=False)

    time_span_begin = Column(DateTime)

    time_span_end = Column(DateTime)

    location = Column(String(255))

    description = Column(Text)

    status = Column(String(255))

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # グループテーブルとの関係
    groups = relationship(
        "app.modules.group.models.Group",
        back_populates="tasks"
    )
    task_user_relations = relationship(
        "TaskUser_Relation", 
        back_populates="tasks",
        cascade="all, delete-orphan"
    )

class TaskUser_Relation(Base):

    __tablename__ = "task_user_relaitons"
    
    relation_id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    task_id = Column(String(36), ForeignKey("tasks.task_id", ondelete="CASCADE"), nullable=False)
    user_id = Column(String(36), ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)

    is_assigned = Column(Boolean, default=False, comemnt="True: 担当者, False: 担当者でない")
    reaction = Column(String(20), default="no-reaction",comment="join: 参加, absent: 不参加, undecided: 未定, no-reaction: 無反応")
    comment = Column(Text)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    users = relationship(
        "app.modules.user.models.User",
        back_populates="task_user_relations"
    )
    tasks = relationship(
        "Task", 
        back_populates="task_user_relations"
    )
    # task_idとuser_idの組み合わせはユニークである必要がある
    __table_args__ = (
        UniqueConstraint('task_id', 'user_id', name='unique_task_user_membership'),
    )