
import React, { useState } from 'react'
import { create_new_todo } from '../apis/index'

export default function Head({updatedTodos}) {
  const [inputValue, setInValue] = useState('')

  const handleKeyup = async (e) => {
    if (e.key === 'Enter' &&  inputValue.trim()){
      try{
        const newTodo = {
          todo:inputValue 
        }
        const response = await create_new_todo(newTodo)
        setInValue('')
        updatedTodos?.();
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
