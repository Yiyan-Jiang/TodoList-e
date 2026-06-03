import { useState } from 'react'
import type { KeyboardEvent } from 'react'

interface HeadProps {
  onCreate: (todoText: string) => void | Promise<void>
}

export default function Head({ onCreate }: HeadProps) {
  const [inputValue, setInValue] = useState('')

  const submitTodo = async () => {
    const nextValue = inputValue.trim()
    if (!nextValue) return

    try {
      await onCreate(nextValue)
      setInValue('')
    } catch (err) {
      console.error(err)
    }
  }

  const handleKeyup = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return

    await submitTodo()
  }

  const handleClick = async () => {
    await submitTodo()
  }

  return (
    <div className='p-3 flex justify-around'>
      <div className='h-10 border rounded-xl  w-[85%]'>
        <input
          type='text'
          className=' h-full w-full px-2 outline-none rounded-xl focus:bg-gray-50'
          value={inputValue}
          onChange={(e) => setInValue(e.target.value)}
          onKeyUp={handleKeyup}
          placeholder='请输入要添加的内容'
        />
      </div>
      <button
        type='button'
        className='bg-[#C73E3A] flex text-white justify-center gap-1 items-center px-2 w-[11%] max-w-25 rounded-xl active:scale-95'
        onClick={handleClick}
      >
        <h1 className='text-xl'>+</h1> 添加
      </button>
    </div>
  )
}
