import React, { useCallback, useState } from 'react'
import {search_todos} from '../apis/index'
import List from '../component/List'

export default function search() {
  const [searchVal , setsearchVal] = useState('')
  const [todos , setTodos ] = useState([])
  const [loading, setLoading] = useState(false);
  const [err , setErr] = useState(null)
 
 const fetchTodos = useCallback(async () => {
    if (!searchVal.trim()) return;   
    try {
      setLoading(true);
      setErr(null);
      const response = await search_todos(searchVal);
      setTodos(response.data);
    } catch (err) {
      setErr(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchVal]);

  const handleKeyup = useCallback(
    (e) => {
      if (e.key === 'Enter' ) {
        fetchTodos();
      }
    },
    [fetchTodos]
  );

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
        updatedTodos={fetchTodos}/>
    </div>
  )
}
