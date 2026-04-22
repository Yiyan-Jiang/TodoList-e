import React, { useEffect } from 'react'
import Head from '../component/Head'
import List from '../component/List'

import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getTodos, removeTodos, toggleComplete } from '../store/slices/todoSlice'

export default function Show() {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(state => state.todos.items)
  const loading = useAppSelector(state => state.todos.loading)
  const err = useAppSelector( state => state.todos.error)

  useEffect(()=>{
    dispatch(getTodos())
  },[]) // warning 不管

  const allChecked = todos?.length > 0 && todos.every(todo => todo.completed)

  const updataAll = async (e) => {
    try {
      await Promise.all(todos.map(todo => 
        dispatch(toggleComplete({ id:todo.id, completed: e.target.checked }))
      ))
      dispatch(getTodos())
    } catch (err) {
      console.error(err);
    }
  }

  const TodoscmpCnt = todos.filter(todo => todo.completed).length
  const TodouncmpCnt = todos.length - TodoscmpCnt

  const clearAllcmp = async () => {
    const cmpTodos = todos.filter(todo => todo.completed)
    if(cmpTodos.length == 0 ) return

    try {
      await Promise.all(cmpTodos.map( todo => dispatch(removeTodos(todo.id))))
      dispatch(getTodos())
    }catch(err){
      console.error(err);
    }
  }

  return (
    <div className='overflow-auto relative'>
      <Head/>
      <div
      className='overflow-auto h-190'>
      <List  
        todos={todos} err={err} loading={loading}
      />
      </div>

      <div className=' p-2 absolute bottom-0 flex h-10 w-full bg-[#F5EFE1] justify-between items-center'>
        <div>
          <input type="checkbox"
          className='cursor-pointer'
          checked={allChecked}
          onChange={updataAll}
          /> 全选
          <span className='ml-1'>未完成{TodouncmpCnt}</span>
          <span> / </span>
          <span>已完成{TodoscmpCnt}</span>
        </div>
        <div>
          <button
          onClick={clearAllcmp}
          className='h-8 w-35 rounded-md bg-[#C73E3A] active:scale-95 transition cursor-pointer'
          >清除所有已完成</button>
        </div>
      </div>

    </div>
  )
}
