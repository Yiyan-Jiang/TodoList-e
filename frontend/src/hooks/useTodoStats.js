

// @parms 复制一些小的计算

import { useMemo } from "react";


export function useTodoStats(todos){
  return useMemo(()=>{
    const allChecked = todos?.length > 0 && todos.every(todo => todo.completed)
    const TodoscmpCnt = todos.filter(todo => todo.completed).length
    const TodouncmpCnt = todos.length - TodoscmpCnt

    return {
      allChecked,
      TodoscmpCnt,
      TodouncmpCnt,
    }
  },[todos])
}