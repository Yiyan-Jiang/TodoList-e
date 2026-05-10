// frontend/src/hooks/useSearchTodos.js
import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { searchTodos } from '../store/slices/searchSlice'

export function useSearchTodos() {
  const dispatch = useAppDispatch()
  const todos = useAppSelector((state) => state.search.items)
  const loading = useAppSelector((state) => state.search.loading)
  const error = useAppSelector((state) => state.search.error)

  const search = useCallback((keyword) => {
    const nextKeyword = keyword.trim()
    if (!nextKeyword) return

    dispatch(searchTodos(nextKeyword))
  }, [dispatch])

  return {
    todos,
    loading,
    error,
    search,
  }
}