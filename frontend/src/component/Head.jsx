import React, { useState } from 'react'
import { useAppDispatch } from '../store/hooks'
import { addTodo, getTodos } from '../store/slices/todoSlice'


export default function Head() {
  const [inputValue, setInValue] = useState('')
  const dispatch = useAppDispatch()


  const handleKeyup = async (e) => {
    if (e.key === 'Enter' &&  inputValue.trim()){
      try{
        await dispatch(addTodo({todo:inputValue}))
        setInValue('')
        dispatch(getTodos())
      } catch (err){
        console.error(err)
      }
    }
  }

  return (
    <div className='h-10 bg-[#D1B7B2] w-full'>
      <input type="text"
      className=' h-full w-full outline-none focus:bg-gray-50'
      value={inputValue}
      onChange={(e) => setInValue(e.target.value)}
      onKeyUp={handleKeyup}
      placeholder='请输入待办事项'/>
    </div>
  )
}
