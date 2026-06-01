import { startTransition, useOptimistic } from 'react'
import Head from '../component/Head'
import List from '../component/List'
import { useTodos } from '../hooks/useTodos'
import { useTodoStats } from '../hooks/useTodoStats'
import { useReducer, useMemo } from 'react'
import {todoUiInitialState, todoUiReducer} from '../reducers/todoUiReducer'
import type { OptimisticTodo } from '../types/todo'


export default function Show() {
  const {
    todos,
    loading,
    error,
    createTodo,
    deleteTodo,
    editTodo,
    toggleTodo,
    toggleAllTodos,
    clearCompletedTodos,
    refreshTodos,
  } = useTodos()

  const [todoUi, dispatchTodoUi] = useReducer(
    todoUiReducer,
    todoUiInitialState
  )

  const [optimisticTodos, addOptimisticTodo] = useOptimistic<
    OptimisticTodo[],
    OptimisticTodo
  >(
    todos,
    (currentTodos, nextTodo) => [nextTodo, ...currentTodos]
  )


  const visibleTodos = useMemo(()=>{
    if (todoUi.filter === 'active'){
      return optimisticTodos.filter((todo)=> !todo.completed)
    }
    if(todoUi.filter === 'completed'){
      return optimisticTodos.filter((todo) => todo.completed)
    }

    return optimisticTodos
  },[optimisticTodos, todoUi.filter])


  const todoStats = useTodoStats(optimisticTodos)

  const handleCreate = (todoText: string) => {
    const tempTodo: OptimisticTodo = {
      id: Date.now(),
      todo:todoText,
      completed:false,
      pending:true,
    }

    startTransition(async () => {
      addOptimisticTodo(tempTodo)

      try {
        await createTodo(todoText)
      } catch (err) {
        console.error(err);
        refreshTodos()
      }
    })
  }

  return (
    <div className='overflow-auto relative'>
      <Head onCreate={handleCreate}/>

      <div className='bg-pink-300 h-10 w-full flex justify-between p-2'>
        <button onClick={() => dispatchTodoUi({ type: 'SET_FILTER', payload: 'all' })}>
          全部
        </button>
        <button onClick={() => dispatchTodoUi({ type: 'SET_FILTER', payload: 'active' })}>
          未完成
        </button>
        <button onClick={() => dispatchTodoUi({ type: 'SET_FILTER', payload: 'completed' })}>
          已完成
        </button>
      </div>

      <div
      className='overflow-auto h-178'>
      <List  
        todos={visibleTodos} err={error} loading={loading}
        onDelete={deleteTodo} onEdit = {editTodo} onToggle={toggleTodo}
      />
      </div>

      <div className=' p-2 absolute bottom-0 flex h-10 w-full bg-[#F5EFE1] justify-between items-center'>
        <div>
          <input type="checkbox"
          className='cursor-pointer'
          checked={todoStats.allChecked}
          onChange={(e) => toggleAllTodos(e.target.checked)}
          /> 
          {' '}全选
          <span className='ml-1'>未完成{todoStats.TodouncmpCnt}</span>
          <span> / </span>
          <span>已完成{todoStats.TodoscmpCnt}</span>
        </div>
        <div>
          <button
          onClick={clearCompletedTodos}
          className='h-8 w-35 rounded-md bg-[#C73E3A] active:scale-95 transition cursor-pointer'
          >清除所有已完成</button>
        </div>
      </div>

    </div>
  )
}
