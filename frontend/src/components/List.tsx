import { memo } from 'react'
import TodoItem from './TodoItem'
import Loading from './Share/Loading'
import type { Todo } from '../types/todo'

interface ListProps {
  todos: Todo[]
  err: string | null
  loading: boolean
  onDelete: (id: number) => void | Promise<void>
  onEdit: (id: number, nextValue: string) => void | Promise<void>
  onToggle: (id: number, completed: boolean) => void | Promise<void>
}

const List = memo(function List({
  todos,
  err,
  loading,
  onDelete,
  onEdit,
  onToggle,
}: ListProps) {
  if (loading) {
    return (
      <div className='flex min-h-40 items-center justify-center'>
        <Loading />
      </div>
    )
  }

  if (err) {
    return <div>{err}</div>
  }

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggle={onToggle}
        />
      ))}
    </div>
  )
})

export default List
