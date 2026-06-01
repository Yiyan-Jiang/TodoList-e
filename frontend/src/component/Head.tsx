import { useState } from 'react'
import type { KeyboardEvent } from 'react'

interface HeadProps {
  onCreate: (todoText: string) => void | Promise<void>
}

export default function Head({ onCreate }: HeadProps) {
  const [inputValue, setInValue] = useState('')

  const handleKeyup = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const nextValue = inputValue.trim()
      try {
        await onCreate(nextValue)
        setInValue('')
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <div className='h-10 bg-[#D1B7B2] w-full'>
      <input
        type='text'
        className=' h-full w-full outline-none focus:bg-gray-50'
        value={inputValue}
        onChange={(e) => setInValue(e.target.value)}
        onKeyUp={handleKeyup}
        placeholder='璇疯緭鍏ュ緟鍔炰簨椤?'
      />
    </div>
  )
}
