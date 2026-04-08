from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from models import Todo
from schemas import TodoCreate, TodoUpdate

# 下面实现对数据库的增删改查

async def get_todos(db:AsyncSession, skip:int = 0, limit:int = 100):
    res = await db.execute(
        select(Todo).offset(skip).limit(limit)
    )
    return res.scalars().all()

async def search_todos(db:AsyncSession, search_str: str):
    res = await db.execute(select(Todo).where(Todo.todo.like(f'%{search_str}%')))
    return res.scalars().all()

async def create_todo(db:AsyncSession, todo: TodoCreate):
    db_todo = Todo(**todo.model_dump())
    db.add(db_todo)
    await db.commit()
    await db.refresh(db_todo)
    return db_todo

async def update_todo(db:AsyncSession, todo_id: int ,todo_update: TodoUpdate):
    res = await db.execute(select(Todo).where(Todo.id == todo_id))
    todo = res.scalar_one_or_none()
    if not todo:
        return None #其实一般不会没有？防注入？毕竟是路径参数来的
    update_data = todo_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(todo, key, value)
    await db.commit()
    await db.refresh(todo)
    return todo

async def delete_todo(db:AsyncSession, todo_id: int ):
    res = await  db.execute(select(Todo.id).where(Todo.id == todo_id))
    del_id = res.scalar_one_or_none()
    if not del_id:
        return None
    await db.execute(delete(Todo).where(Todo.id == todo_id))
    await db.commit()
    return del_id
