// frontend/src/component/List.jsx
import React, { memo } from 'react'
import TodoItem from './TodoIiem'

const List = memo(function List({
  todos,
  err,
  loading,
  onDelete,
  onEdit,
  onToggle,
}) {
  if (loading) {
    return <div>加载中</div>
  }

  if (err) {
    return <div>{err}</div>
  }

  return (
    <div>
      {todos?.map((todo) => (
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