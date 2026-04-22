import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './slices/todoSlice'
import searchReducer from './slices/searchSlice'


export const store = configureStore({
  reducer:{
    todos:todoReducer,
    search:searchReducer,
  }
})