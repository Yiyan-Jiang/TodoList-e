import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { search_todos } from '../../apis'
import type { Todo, TodoState } from '../../types/todo'

export const searchTodos = createAsyncThunk<Todo[], string>(
  'todos/searchTodos',
  async (searchStr) => {
    const res = await search_todos(searchStr)
    return res.data
  }
)

const initialState: TodoState = {
  items: [],
  loading: false,
  error: null,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearchResult: (state) => {
      state.items = []
      state.loading = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchTodos.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchTodos.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(searchTodos.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? '搜索失败'
      })
  },
})

export const { clearSearchResult } = searchSlice.actions
export default searchSlice.reducer
