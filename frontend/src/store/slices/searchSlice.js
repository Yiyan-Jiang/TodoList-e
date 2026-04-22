import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { search_todos } from "../../apis";




// 搜索Todos
export const searchTodos = createAsyncThunk('todos/searchTodos', async (searchStr) => {
  const res = await search_todos(searchStr)
  return res.data
})

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers:{},
  extraReducers:(builder) => {
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
        state.error = action.error.message
      })
  }
})

export default searchSlice.reducer