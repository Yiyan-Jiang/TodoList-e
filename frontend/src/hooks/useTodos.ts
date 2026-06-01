import { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  addTodo,
  editTodos,
  getTodos,
  removeTodos,
  toggleComplete,
} from '../store/slices/todoSlice'

interface UseTodosOptions {
  autoLoad?: boolean
}

export function useTodos({ autoLoad = true }: UseTodosOptions = {}) {
  const dispatch = useAppDispatch()
  const todos = useAppSelector((state) => state.todos.items)
  const loading = useAppSelector((state) => state.todos.loading)
  const error = useAppSelector((state) => state.todos.error)

  const refreshTodos = useCallback(() => {
    dispatch(getTodos())
  }, [dispatch])

  useEffect(() => {
    if (autoLoad) {
      refreshTodos()
    }
  }, [autoLoad, refreshTodos])

  const createTodo = useCallback(
    async (todo: string) => {
      await dispatch(addTodo({ todo })).unwrap()
      refreshTodos()
    },
    [dispatch, refreshTodos]
  )

  const deleteTodo = useCallback(
    async (id: number) => {
      await dispatch(removeTodos(id)).unwrap()
      refreshTodos()
    },
    [dispatch, refreshTodos]
  )

  const editTodo = useCallback(
    async (id: number, newValue: string) => {
      await dispatch(editTodos({ id, data: { todo: newValue } })).unwrap()
    },
    [dispatch]
  )

  const toggleTodo = useCallback(
    async (id: number, completed: boolean) => {
      await dispatch(toggleComplete({ id, completed })).unwrap()
    },
    [dispatch]
  )

  const toggleAllTodos = useCallback(
    async (completed: boolean) => {
      await Promise.all(
        todos.map((todo) =>
          dispatch(toggleComplete({ id: todo.id, completed })).unwrap()
        )
      )
      refreshTodos()
    },
    [dispatch, refreshTodos, todos]
  )

  const clearCompletedTodos = useCallback(async () => {
    const completedTodos = todos.filter((todo) => todo.completed)
    if (completedTodos.length === 0) return

    await Promise.all(
      completedTodos.map((todo) => dispatch(removeTodos(todo.id)).unwrap())
    )
    refreshTodos()
  }, [dispatch, refreshTodos, todos])

  return {
    todos,
    loading,
    error,
    refreshTodos,
    createTodo,
    deleteTodo,
    editTodo,
    toggleTodo,
    toggleAllTodos,
    clearCompletedTodos,
  }
}
