import React, { useState } from 'react'
import { useAppDispatch } from '../store/hooks'
import { removeTodos, editTodos, toggleComplete, getTodos } from '../store/slices/todoSlice'


export default function List({ todos,err,loading,onRefresh }) {
  const [isEditing,setisEditing] = useState(null)
  const [inputValue,setinputValue] = useState('') ;
  const dispatch = useAppDispatch()



  const doublehanlde = (todo) =>{
    setisEditing(todo.id)
    setinputValue(todo.todo)
  }

  const inputBlur = () => {
    setisEditing(null)
    setinputValue('')
  }

  const handleclick = (id) => {
    return async () => {
      if(window.confirm('确定要删除吗？')){
        try{
         await dispatch(removeTodos(id))
         if(onRefresh){
          onRefresh()
         }else{
          dispatch(getTodos())
         }
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
          await dispatch(editTodos({ id, data: {todo: inputValue} }))
          inputBlur()
          if(onRefresh){
            onRefresh()
          }else{
            dispatch(getTodos())
          }
        }catch(err){
          console.error(err)
        }
      }
    }
  }

  const updataCheck = (id) => {
    return async (e) => {
      try{
        await dispatch(toggleComplete({ id, completed: e.target.checked }))
        if(onRefresh){
          onRefresh()
        }else{
          dispatch(getTodos())
        }
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
