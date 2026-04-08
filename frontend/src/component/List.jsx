import React, { useEffect, useState } from 'react'

import {update_existing_todo,delete_existing_todo} from '../apis/index'

export default function List({todos,err,loading,updatedTodos}) {
  const [isEditing,setisEditing] = useState(null)
  const [inputValue,setinputValue] = useState('')


  const doublehanlde = (todo) =>{
    setisEditing(todo.id)
    setinputValue(todo.todo)
  }

  const inputBlur = () => {
    setisEditing(null)
    setinputValue('')
  }

  const handleclick = (id) => {
    return async (e) => {
      if(window.confirm('确定要删除吗？')){
        try{
          const response = await delete_existing_todo(id)
          updatedTodos?.();
        }catch(err){
          console.error(err)
        }
      }else{
        return
      }
    }
  }

  const updateKeyup = (id)=>{
    return async (e) => {
       if (e.key === 'Enter' &&  inputValue.trim()){
        try{
          const newTodo = {
            id:id,
            todo:inputValue
          }
          const response = await update_existing_todo(id,newTodo)
          inputBlur()
          updatedTodos?.();
        }catch(err){
          console.error(err)
        }
      }
    }
  }

  const updataCheck = (id) => {
    return async (e) => {
      try{
        const newTodo = {
          id:id,
          completed:e.target.checked 
        }
        const response = await update_existing_todo(id,newTodo)
        updatedTodos?.();
      }catch(err){
        console.error(err)
      }
    }
  }

  if(loading){
    return(
      <div>加载中</div>
    )
  }
  if(err){
    return(
      <div>{err}</div>
    )
  }
  return (
    <div>
      {
        todos?.map(todo => (
          <div 
          className='flex pl-2 items-center bg-amber-200 w-[95%] mx-auto my-3 h-10 relative hover:bg-amber-300 group'
          key={todo.id}>
            <input type="checkbox" 
            className='cursor-pointer'
            checked={todo.completed}
            onChange={updataCheck(todo.id)}/>
            {
              isEditing == todo.id ? 
              (
                <input type="text" 
                className='outline-none ml-2'
                value={inputValue}
                onChange={(e) => setinputValue(e.target.value)}
                onKeyUp={updateKeyup(todo.id)}
                autoFocus
                onBlur={inputBlur}/>
              ):(
                <li
                className='list-none ml-2 text-xl'
                onDoubleClick={() => doublehanlde(todo)}>{todo.todo}</li>
              )
            }
            <button
            onClick={handleclick(todo.id)}
            className=' h-8 w-12 absolute right-3 rounded-md bg-[#C73E3A] active:scale-95 transition hidden group-hover:block cursor-pointer'
            >删除</button>
          </div>
        ))
      }
    </div>
  )
}
