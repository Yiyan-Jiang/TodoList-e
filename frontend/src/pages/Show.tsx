import { startTransition, useMemo, useOptimistic } from 'react'
import { useOutletContext } from 'react-router-dom'
import Head from '../components/Head'
import List from '../components/List'
import { useTodos } from '../hooks/useTodos'
import { useTodoStats } from '../hooks/useTodoStats'
import type { TodoFilter } from '../reducers/todoUiReducer'
import type { OptimisticTodo } from '../types/todo'
import type { TodoLayoutContext } from './Layout'

import {Circle,CircleCheckBig} from 'lucide-react'

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

  const { filter, setFilter } = useOutletContext<TodoLayoutContext>()

  const [optimisticTodos, addOptimisticTodo] = useOptimistic<
    OptimisticTodo[],
    OptimisticTodo
  >(todos, (currentTodos, nextTodo) => [nextTodo, ...currentTodos])

  const visibleTodos = useMemo(() => {
    if (filter === 'active') {
      return optimisticTodos.filter((todo) => !todo.completed)
    }

    if (filter === 'completed') {
      return optimisticTodos.filter((todo) => todo.completed)
    }

    return optimisticTodos
  }, [optimisticTodos, filter])

  const todoStats = useTodoStats(optimisticTodos)

  const filters: Array<{ label: string; value: TodoFilter; cnt: number }> = [
    { label: '全部', value: 'all', cnt: todoStats.TodosCnt },
    { label: '未完成', value: 'active', cnt: todoStats.TodouncmpCnt },
    { label: '已完成', value: 'completed', cnt: todoStats.TodoscmpCnt },
  ]

  const handleCreate = (todoText: string) => {
    const tempTodo: OptimisticTodo = {
      id: Date.now(),
      todo: todoText,
      completed: false,
      pending: true,
    }

    startTransition(async () => {
      addOptimisticTodo(tempTodo)

      try {
        await createTodo(todoText)
      } catch (err) {
        console.error(err)
        refreshTodos()
      }
    })
  }

  return (
    <div className='relative flex h-full min-h-0 flex-col'>
      <Head onCreate={handleCreate} />

      <div className='min-h-0 flex-1 px-3 pb-3'>
        <div className='flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-[#E5D6C8] bg-white shadow-sm'>
          <div className='flex shrink-0 items-center justify-between border-b border-[#F0E4DA] px-4 py-3'>
            <div className='flex h-10 items-center gap-2'>
              {filters.map((item) => {
                const isActive = filter === item.value

                return (
                  <button
                    key={item.value}
                    type='button'
                    onClick={() => setFilter(item.value)}
                    className={[
                      'h-9 rounded-lg px-5 text-sm transition cursor-pointer',
                      isActive
                        ? 'bg-[#C73E3A] text-white'
                        : 'text-[#3F312E] hover:bg-[#F5EFE1]',
                    ].join(' ')}
                  >
                    <span>{item.label}</span>
                    <span className='ml-1 text-xs opacity-75'>
                      ({item.cnt})
                    </span>
                  </button>
                )
              })}
            </div>

            <div className='text-sm text-[#7A6763]'>创建时间占位</div>
          </div>

          <div className='min-h-0 flex-1 overflow-auto'>
            <List
              todos={visibleTodos}
              err={error}
              loading={loading}
              onDelete={deleteTodo}
              onEdit={editTodo}
              onToggle={toggleTodo}
            />
          </div>

          <div className='flex shrink-0 items-center justify-between border-t border-[#F0E4DA] bg-[#FCF8F3] px-4 py-3'>
            <div className='text-[#3F312E] flex items-center gap-2'>
              {/* <input
                type='checkbox'
                className='cursor-pointer'
                checked={todoStats.allChecked}
                onChange={(e) => toggleAllTodos(e.target.checked)}
              /> */}
              <button
                type='button'
                role='checkbox'
                aria-checked={todoStats.TodoscmpCnt == todoStats.TodosCnt}
                aria-label={todoStats.TodoscmpCnt == todoStats.TodosCnt ? '全选' : '取消全选'}
                onClick={() => toggleAllTodos(!(todoStats.TodoscmpCnt == todoStats.TodosCnt))}
              >
                {todoStats.allChecked ? (
                  <CircleCheckBig></CircleCheckBig>
                ) : (
                  <Circle></Circle>
                )}
              </button>

              {' '}全选
            </div>

            <button
              onClick={clearCompletedTodos}
              className='h-9 rounded-lg bg-[#C73E3A] px-4 text-white active:scale-95 transition cursor-pointer'
            >
              清除所有已完成
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
