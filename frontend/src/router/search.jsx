// frontend/src/router/Search.jsx
import React, { useReducer } from 'react'
import List from '../component/List'
import { useSearchTodos } from '../hooks/useSearchTodos'
import { useTodos } from '../hooks/useTodos'
import {
  todoUiInitialState,
  todoUiReducer,
} from '../reducers/todoUiReducer'

export default function Search() {
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

  const handleKeyUp = (e) => {
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
        editingId={todoUi.editingId}
        draftText={todoUi.draftText}
        onStartEdit={(todo) =>
          dispatchTodoUi({
            type: 'START_EDIT',
            payload: {
              id: todo.id,
              text: todo.todo,
            },
          })
        }
        onChangeDraftText={(value) =>
          dispatchTodoUi({
            type: 'SET_DRAFT_TEXT',
            payload: value,
          })
        }
        onCancelEdit={() => dispatchTodoUi({ type: 'CANCEL_EDIT' })}
        onDelete={async (id) => {
          await deleteTodo(id)
          refreshSearchResult()
        }}
        onEdit={async (id) => {
          await editTodo(id, todoUi.draftText)
          dispatchTodoUi({ type: 'CANCEL_EDIT' })
          refreshSearchResult()
        }}
        onToggle={async (id, completed) => {
          await toggleTodo(id, completed)
          refreshSearchResult()
        }}
      />
    </div>
  )
}