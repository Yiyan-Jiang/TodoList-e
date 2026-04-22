import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { read_todos, create_new_todo, update_existing_todo, delete_existing_todo} from '../../apis'

//  获取Todos
export const getTodos = createAsyncThunk('todos/getTodos', async () => {
  const res = await read_todos()
  return res.data
})

// 添加新的Todo
export const addTodo = createAsyncThunk('todos/addTodos', async (newTodo) => {
  const res = await create_new_todo(newTodo)
  return res
})

// 更新Todo
export const editTodos = createAsyncThunk('todos/editTodos', async ({id ,data}) => {
  const res = await update_existing_todo(id,data)
  return res
})

// 删除Todo
export const removeTodos = createAsyncThunk('todos/removeTodos', async (id) => {
  await delete_existing_todo(id)
  return id
})

// 更新Todo的完成状态
export const toggleComplete = createAsyncThunk('todos.toggleComplete', async({id,completed}) => {
  const res = await update_existing_todo(id, {completed})
  return {id, completed: res.data.completed}
})

// 注册slice
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items:[],
    loading:false,
    error:null,
  },
  reducers:{}, 
  // 同步的reducers,这里没有，但是得知道
  extraReducers:(builder) => {
    // 处理异步的reducer
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
        state.error = action.error.message
      })
      .addCase(addTodo.fulfilled, (state,action) => {
        state.items.push(action.payload)
      })
      .addCase(addTodo.rejected,(state, action) => {
        state.error = action.error.message
      })
      .addCase(editTodos.fulfilled, (state, action) => {
        const index = state.items.findIndex( t => t.id === action.payload.id)
        if( index !== -1 ) state.items[index] = {...state.items[index], ...action.payload.data}
      })
      .addCase(editTodos.rejected, (state, action) => {
        state.error = action.message.error
      })
      .addCase(removeTodos.fulfilled, (state, action)=> {
        state.items = state.items.filter(t => t.id !== action.payload)
      })
      .addCase(removeTodos.rejected, (state, action)=> {
        state.error = action.message.error
      })
      .addCase(toggleComplete.fulfilled, (state, action) => {
        const todo = state.items.find(t => t.id === action.payload.id)
        if (todo) todo.completed = action.payload.completed
      })
      .addCase(toggleComplete.rejected, (state, action) => {
        state.error = action.error.message
      })
      // .addMatcher() 模糊监听，这里没用到，但是得知道
  }
})

export default todoSlice.reducer