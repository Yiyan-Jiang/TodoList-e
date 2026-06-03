import { Outlet } from 'react-router-dom';
import LeftTab from '../components/LeftTab'
import { useState } from 'react'
import type { TodoFilter } from '../reducers/todoUiReducer'
import { useTodos } from '../hooks/useTodos';
import { useTodoStats } from '../hooks/useTodoStats';

import { ClipboardList, Sun} from 'lucide-react'

export interface TodoLayoutContext {
  filter: TodoFilter
  setFilter: (filter: TodoFilter) => void
}


export default function Layout() {
  const [filter, setFilter] = useState<TodoFilter>('all')
  const {todos} = useTodos()
  const todoStates = useTodoStats(todos)

  const handleClick = () => {
    alert('还没做模式的切换')
  }

  return (
    <div className='bg-pink-300 w-screen h-screen mx-auto flex'>
      <LeftTab />

      <div className='min-w-0 flex flex-1 flex-col'>
        <div
        className='bg-[#C73E3A] h-20 flex items-center p-5 justify-between'>

          <div className='flex items-center'>
            <ClipboardList className='text-white h-8 w-8'></ClipboardList>
            <div className='flex flex-col items-start align-middle pl-2'>
              <div className='text-2xl flex-1 '>
                全部待办
              </div>
              <span className='text-sm text-gray-800'>
                共有 {todoStates.TodosCnt} 项待办</span>
            </div>
          </div>
          
          <div className='flex items-center'>
            <button
            onClick={handleClick} 
            className='rounded-3xl w-9 h-9 bg-white items-center flex justify-center cursor-pointer active:scale-95'>
              <Sun></Sun>
            </button>
          </div>
        </div>


        <div
        className='min-h-0 flex-1 bg-[#F5EFE1]'>
          <main className='h-full'>
            <Outlet context={{ filter, setFilter } satisfies TodoLayoutContext} />
          </main>
        </div>
      </div>
    </div>
  );
}
