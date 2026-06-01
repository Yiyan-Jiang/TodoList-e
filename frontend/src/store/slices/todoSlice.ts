import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  create_new_todo,
  delete_existing_todo,
  read_todos,
  update_existing_todo,
} from '../../apis'
import type {
  Todo,
  TodoCreatePayload,
  TodoState,
  TodoUpdatePayload,
} from '../../types/todo'

export const getTodos = createAsyncThunk<Todo[]>('todos/getTodos', async () => {
  const res = await read_todos()
  return res.data
})

export const addTodo = createAsyncThunk<Todo, TodoCreatePayload>(
  'todos/addTodos',
  async (newTodo) => {
    const res = await create_new_todo(newTodo)
    return res.data
  }
)

export const editTodos = createAsyncThunk<
  Todo,
  { id: number; data: TodoUpdatePayload }
>('todos/editTodos', async ({ id, data }) => {
  const res = await update_existing_todo(id, data)
  return res.data
})

export const removeTodos = createAsyncThunk<number, number>(
  'todos/removeTodos',
  async (id) => {
    await delete_existing_todo(id)
    return id
  }
)

export const toggleComplete = createAsyncThunk<
  { id: number; completed: boolean },
  { id: number; completed: boolean }
>('todos.toggleComplete', async ({ id, completed }) => {
  const res = await update_existing_todo(id, { completed })
  return { id, completed: res.data.completed }
})

const initialState: TodoState = {
  items: [],
  loading: false,
  error: null,
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? '加载失败'
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.error = action.error.message ?? '新增失败'
      })
      .addCase(editTodos.fulfilled, (state, action) => {
        const index = state.items.findIndex((todo) => todo.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(editTodos.rejected, (state, action) => {
        state.error = action.error.message ?? '更新失败'
      })
      .addCase(removeTodos.fulfilled, (state, action) => {
        state.items = state.items.filter((todo) => todo.id !== action.payload)
      })
      .addCase(removeTodos.rejected, (state, action) => {
        state.error = action.error.message ?? '删除失败'
      })
      .addCase(toggleComplete.fulfilled, (state, action) => {
        const todo = state.items.find((item) => item.id === action.payload.id)
        if (todo) todo.completed = action.payload.completed
      })
      .addCase(toggleComplete.rejected, (state, action) => {
        state.error = action.error.message ?? '更新状态失败'
      })
  },
})

export default todoSlice.reducer
