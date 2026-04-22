import React, { useState } from 'react'
import List from '../component/List'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { searchTodos } from '../store/slices/searchSlice'



export default function Search() {
  const [searchVal , setsearchVal] = useState('')
  const dispatch = useAppDispatch()
  const todos = useAppSelector( state => state.search.items )
  const loading = useAppSelector( state => state.search.loading )
  const err = useAppSelector( state => state.search.error)


  const handleKeyup = (e) => {
    if (e.key == 'Enter' && searchVal.trim()) {
      dispatch(searchTodos(searchVal))
    }
  }

  // 传递一个刷新函数，解决search不动态更新的问题
  const handleRefresh = () => {
    if (searchVal.trim()) {
      dispatch(searchTodos(searchVal))
    }
  }
  return (
    <div>
      <div className='h-10 bg-[#D1B7B2] w-full'>
        <input type="text"
        className=' h-full w-full outline-none focus:bg-gray-50'
        value={searchVal}
        onChange={(e) => setsearchVal(e.target.value)}
        onKeyUp={handleKeyup}
        placeholder='请输入要搜索的事项'/>
      </div>
      <List  
        todos={todos} err={err} loading={loading}
        onRefresh={handleRefresh}
      />
    </div>
  )
}
