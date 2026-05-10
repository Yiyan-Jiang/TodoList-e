
import { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  getTodos,
  addTodo,
  removeTodos,
  editTodos,
  toggleComplete,
} from '../store/slices/todoSlice'

export function useTodos({autoLoad = true} = {}) {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(state => state.todos.items)
  const loading = useAppSelector(state => state.todos.loading)
  const error = useAppSelector(state => state.todos.error)

  const refreshTodos = useCallback(() => {
    dispatch(getTodos())
  }, [dispatch])

  useEffect(() => {
    if (autoLoad) {
      refreshTodos()
    }
  }, [autoLoad, refreshTodos])

  const createTodo = useCallback(
    async (todo) => {
      await dispatch(addTodo({ todo })).unwrap()
      refreshTodos()
    },
    [dispatch, refreshTodos]
  )

  const deleteTodo = useCallback(
    async (id) => {
      await dispatch(removeTodos(id)).unwrap()
      refreshTodos()
    },
    [dispatch, refreshTodos]
  )

  const editTodo = useCallback(
    async (id, newValue) => {
      await dispatch(editTodos({ id, data: { todo: newValue } })).unwrap()
      refreshTodos()
    },
    [dispatch, refreshTodos]
  )

  const toggleTodo = useCallback(
    async (id, completed) => {
      await dispatch(toggleComplete({ id, completed })).unwrap()
      refreshTodos()
    },
    [dispatch, refreshTodos]
  )

  const toggleAllTodos = useCallback(
    async (completed) => {
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
