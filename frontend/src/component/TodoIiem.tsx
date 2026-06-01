import { memo, useLayoutEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import type { Todo } from '../types/todo'

interface TodoItemProps {
  todo: Todo
  onDelete: (id: number) => void | Promise<void>
  onEdit: (id: number, nextValue: string) => void | Promise<void>
  onToggle: (id: number, completed: boolean) => void | Promise<void>
}

const TodoItem = memo(function TodoItem({
  todo,
  onDelete,
  onEdit,
  onToggle,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  useLayoutEffect(() => {
    if (!isEditing) return

    const input = inputRef.current
    if (!input) return

    input.focus()
    input.setSelectionRange(input.value.length, input.value.length)
  }, [isEditing])

  const handleDoubleClick = () => {
    setIsEditing(true)
    setInputValue(todo.todo)
  }

  const closeEditing = () => {
    setIsEditing(false)
    setInputValue('')
  }

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return

    const nextValue = inputValue.trim()
    if (!nextValue) return

    onEdit(todo.id, nextValue)
    closeEditing()
  }

  return (
    <div className='flex pl-2 items-center bg-amber-200 w-[95%] mx-auto my-3 h-10 relative hover:bg-amber-300 group'>
      <input
        type='checkbox'
        className='cursor-pointer'
        checked={todo.completed}
        onChange={(e) => onToggle(todo.id, e.target.checked)}
      />

      {isEditing ? (
        <input
          ref={inputRef}
          type='text'
          className='outline-none ml-2'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={handleKeyUp}
          autoFocus
          onBlur={closeEditing}
        />
      ) : (
        <li
          className='list-none ml-2 text-xl'
          onDoubleClick={handleDoubleClick}
        >
          {todo.todo}
        </li>
      )}

      <button
        onClick={() => onDelete(todo.id)}
        className='h-8 w-12 absolute right-3 rounded-md bg-[#C73E3A] active:scale-95 transition hidden group-hover:block cursor-pointer'
      >
        鍒犻櫎
      </button>
    </div>
  )
})

export default TodoItem
