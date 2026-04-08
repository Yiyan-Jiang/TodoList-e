import React, { useEffect, useState ,useCallback } from 'react'
import Head from '../component/Head'
import List from '../component/List'
import { read_todos,update_existing_todo,delete_existing_todo } from '../apis/index'



export default function Show() {
  const [todos , setTodos ] = useState([])
  const [loading , setLoading] = useState(true)
  const [err , setErr] = useState(null)

  const fetchTodos = useCallback(
    async () => {
    try {
      setLoading(true);
      const response = await read_todos();
      setTodos(response.data);
      setErr(null);
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
    }, []);

  

  const allChecked = todos.length > 0 && todos.every(todo => todo.completed)

  const updataAll = async (e) => {
    const updataProm = todos.map(todo => 
      update_existing_todo(todo.id, { ...todo, completed:e.target.checked })
    )
    try{
      await Promise.all(updataProm) //异步实现，map没法await
      await fetchTodos();
    }catch(err){
      console.error(err);
    }
  }

  const TodoscmpCnt = todos.filter(todo => todo.completed).length;
  const TodouncmpCnt = todos.length - TodoscmpCnt;

  const clearAllcmp = async () => {
    const cmpTodos = todos.filter(todo => todo.completed)
    if(cmpTodos.length == 0) return 
    
    const delPro = cmpTodos.map(todo => delete_existing_todo(todo.id))
    try{
      await Promise.all(delPro)
      await fetchTodos();
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    fetchTodos();
  },[fetchTodos])

  return (
    <div className='overflow-auto relative'>
      <Head
      updatedTodos={fetchTodos}/>
      <div
      className='overflow-auto h-190'>
      <List  
        todos={todos} err={err} loading={loading}
        updatedTodos={fetchTodos}
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
