import { memo, useLayoutEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import type { Todo } from '../types/todo'

import {Circle,CircleCheckBig} from 'lucide-react'

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
    <div className='group flex min-h-12 w-full items-center gap-3 border-b border-[#F0E4DA] px-4 py-3 last:border-b-0 hover:bg-[#E06F6B]'>
      
      {/* <input
        type='checkbox'
        className='cursor-pointer'
        checked={todo.completed}
        onChange={(e) => onToggle(todo.id, e.target.checked)}
      /> */}

      <button
      type='button'
      role='checkbox'
      aria-checked={todo.completed}
      aria-label={todo.completed ? '已完成' : '未完成'}
      onClick={() => onToggle(todo.id, !todo.completed)}
      className=''>
        {todo.completed ? (
          <CircleCheckBig></CircleCheckBig>
        ) : (
          <Circle></Circle>
        )}
      </button>

      {isEditing ? (
        <input
          ref={inputRef}
          type='text'
          className='flex-1 outline-none'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={handleKeyUp}
          autoFocus
          onBlur={closeEditing}
        />
      ) : (
        <li
          className='list-none flex-1 text-lg text-[#3F312E]'
          onDoubleClick={handleDoubleClick}
        >
          {todo.todo}
        </li>
      )}

      <button
        onClick={() => onDelete(todo.id)}
        className='hidden h-8 rounded-md bg-[#C73E3A] px-3 text-white active:scale-95 transition group-hover:block cursor-pointer'
      >
        删除
      </button>
    </div>
  )
})

export default TodoItem
