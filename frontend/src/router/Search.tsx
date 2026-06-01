import { useEffect, useReducer } from 'react'
import type { KeyboardEvent } from 'react'
import List from '../component/List'
import { useSearchTodos } from '../hooks/useSearchTodos'
import { useTodos } from '../hooks/useTodos'
import { useAppDispatch } from '../store/hooks'
import { clearSearchResult } from '../store/slices/searchSlice'
import {
  todoUiInitialState,
  todoUiReducer,
} from '../reducers/todoUiReducer'

export default function Search() {
  const dispatch = useAppDispatch()
  const [todoUi, dispatchTodoUi] = useReducer(
    todoUiReducer,
    todoUiInitialState
  )

  const { todos, loading, error, search } = useSearchTodos()

  const {
    deleteTodo,
    editTodo,
    toggleTodo,
  } = useTodos({ autoLoad: false })

  useEffect(() => {
    return () => {
      dispatch(clearSearchResult())
    }
  }, [dispatch])

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      search(todoUi.keyword)
    }
  }

  const refreshSearchResult = () => {
    search(todoUi.keyword)
  }

  return (
    <div>
      <div className='h-10 bg-[#D1B7B2] w-full'>
        <input
          type='text'
          className='h-full w-full outline-none focus:bg-gray-50'
          value={todoUi.keyword}
          onChange={(e) =>
            dispatchTodoUi({
              type: 'SET_KEYWORD',
              payload: e.target.value,
            })
          }
          onKeyUp={handleKeyUp}
          placeholder='请输入要搜索的事项'
        />
      </div>

      <List
        todos={todos}
        err={error}
        loading={loading}
        onDelete={async (id: number) => {
          await deleteTodo(id)
          refreshSearchResult()
        }}
        onEdit={async (id: number, nextValue: string) => {
          await editTodo(id, nextValue)
          refreshSearchResult()
        }}
        onToggle={async (id: number, completed: boolean) => {
          await toggleTodo(id, completed)
          refreshSearchResult()
        }}
      />
    </div>
  )
}
