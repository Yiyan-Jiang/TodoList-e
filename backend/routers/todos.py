from fastapi import APIRouter, Depends, HTTPException, status,Query
from typing import Annotated, List
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from schemas import TodoCreate, TodoUpdate, TodoResponse
from crud import get_todos, search_todos, create_todo, update_todo, delete_todo

router = APIRouter(prefix="/todos", tags=["todos"])

@router.get('/',response_model=List[TodoResponse])
async def read_todos(
        db: Annotated[AsyncSession, Depends(get_db)],
        skip: int = 0,
        limit: int = 30,
):
    return await get_todos(db, skip=skip, limit=limit)

@router.post('/',response_model=TodoResponse,status_code=status.HTTP_201_CREATED)
async def create_new_todo(
        todo: TodoCreate,
        db: Annotated[AsyncSession, Depends(get_db)],
):
    return await create_todo(db, todo)

@router.get('/search',response_model=List[TodoResponse])
async def read_by_search_todos(
        db: Annotated[AsyncSession, Depends(get_db)] ,
        search_str: str = Query(...),
):
    todos = await search_todos(db, search_str)
    if todos is None:
        return []
    return todos

@router.put("/{todo_id}",response_model=TodoResponse)
async def update_existing_todo(
        todo_id: int,
        todo_update: TodoUpdate,
        db: Annotated[AsyncSession, Depends(get_db)],
):
    todo = await update_todo(db, todo_id, todo_update)
    if todo is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail='not found')
    return todo

@router.delete('/{todo_id}',status_code=status.HTTP_204_NO_CONTENT)
async def delete_existing_todo(
        todo_id: int,
        db: Annotated[AsyncSession, Depends(get_db)],
):
    deleted = await delete_todo(db, todo_id)
    if deleted is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail='not found')


