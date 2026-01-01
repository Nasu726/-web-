from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from . import models, schemas

# --- Task本体の操作 ---

def create_task(db: Session, task_in: schemas.TaskCreate, group_id: str):
    db_task = models.Task(
        **task_in.model_dump(),
        group_id=group_id
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def get_tasks_by_group(db: Session, group_id: str, limit: int = 100):
    return db.query(models.Task)\
        .filter(models.Task.group_id == group_id)\
        .order_by(models.Task.date.asc())\
        .limit(limit)\
        .all()

def get_task(db: Session, task_id: str, group_id: str):
    return db.query(models.Task).filter(
        models.Task.task_id == task_id,
        models.Task.group_id == group_id
    ).first()

def update_task(db: Session, db_task: models.Task, task_update: schemas.TaskUpdate):
    update_data = task_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_task, field, value)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def delete_task(db: Session, db_task: models.Task):
    db.delete(db_task)
    db.commit()

# --- Relation (担当/参加) の操作 ---

def add_user_to_task(db: Session, task_id: str, user_id: str, is_assigned: bool = False):
    """タスクにユーザーを関連付ける（初期状態）"""
    try:
        relation = models.TaskUser_Relation(
            task_id=task_id,
            user_id=user_id,
            is_assigned=is_assigned,
            reaction="no-reaction"
        )
        db.add(relation)
        db.commit()
        db.refresh(relation)
        return relation
    except IntegrityError:
        db.rollback()
        return None # すでに追加済みの場合は無視あるいはエラーハンドリング

def get_relation(db: Session, task_id: str, user_id: str):
    """特定のユーザーとタスクの関係を取得"""
    return db.query(models.TaskUser_Relation).filter(
        models.TaskUser_Relation.task_id == task_id,
        models.TaskUser_Relation.user_id == user_id
    ).first()

def update_relation(db: Session, db_relation: models.TaskUser_Relation, relation_update: schemas.TaskUserRelationUpdate):
    """リアクションやコメント、担当フラグの更新"""
    update_data = relation_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_relation, field, value)
    db.add(db_relation)
    db.commit()
    db.refresh(db_relation)
    return db_relation