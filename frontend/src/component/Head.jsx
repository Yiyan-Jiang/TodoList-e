import React, { useState } from 'react'


export default function Head({onCreate}) {
  const [inputValue, setInValue] = useState('')
  

  const handleKeyup = async (e) => {
    if (e.key === 'Enter' &&  inputValue.trim()){
      const nextValue = inputValue.trim()
      try{
        await onCreate(nextValue)
        setInValue('')
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
