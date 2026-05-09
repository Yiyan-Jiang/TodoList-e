import React, { memo, useCallback } from 'react'
import { useAppDispatch } from '../store/hooks'
import { removeTodos, editTodos, toggleComplete, getTodos } from '../store/slices/todoSlice'

import TodoItem from './TodoIiem'

const List = memo(function List({todos, err,loading, onRefresh}){
  const dispath = useAppDispatch()

  const refreshTodos = useCallback(()=>{
    if (onRefresh){
      onRefresh()
    }else{
      dispath(getTodos())
    }
  },[dispath, onRefresh]) 

  const handleDelete = useCallback(
    async (id) => {
      if(!window.confirm('确定要删除吗')) return 

      try{
        await dispath(removeTodos(id))
        refreshTodos()
      }catch(err){
        console.error(err);
      }
    },
    [dispath, refreshTodos]
  )

  const handleEdit = useCallback(
    async (id, newValue)=>{
      try {
        await dispath(editTodos({id, data:{todo:newValue}}))
        refreshTodos()
      }catch(err){
        console.error(err);
      }
  },
  [dispath, refreshTodos])

  const handleToggle = useCallback(
    async(id, completed) => {
      try{
        await dispath(toggleComplete({id,completed}))
        refreshTodos()
      } catch(err){
        console.error(err);
      }
    },
    [dispath, refreshTodos]
  )

  if (err) {
    return <div>{err}</div>
  }

  return (
    <div>
      {todos?.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onToggle={handleToggle}
        />
      ))}
    </div>
  )
})

export default List
