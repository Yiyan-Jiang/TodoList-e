import { useMemo } from 'react'
import type { Todo } from '../types/todo'

export function useTodoStats(todos: Todo[]) {
  return useMemo(() => {
    const allChecked = todos.length > 0 && todos.every((todo) => todo.completed)
    const TodoscmpCnt = todos.filter((todo) => todo.completed).length
    const TodouncmpCnt = todos.length - TodoscmpCnt
    const TodosCnt = todos.length

    return {
      allChecked,
      TodoscmpCnt,
      TodouncmpCnt,
      TodosCnt,
    }
  }, [todos])
}
