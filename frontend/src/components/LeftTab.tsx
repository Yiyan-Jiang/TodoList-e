import { NavLink } from 'react-router-dom'
import { Search, List } from 'lucide-react'

import { ChessQueen } from 'lucide-react'

const tabs = [
  { label: '查看', to: '/' ,icon:List},
  { label: '搜索', to: '/search',icon:Search },
]

export default function LeftTab() {
  return (
    <aside className='h-full w-40 shrink-0 bg-[#F5EFE1] border-r border-[#D1B7B2]'>
      <ChessQueen
      className='h-12 w-12 mx-auto text-[#C73E3A] mt-5'
      ></ChessQueen>

      <nav className='flex flex-col pt-8 text-center'>
        {tabs.map((tab) => {
          const Icon = tab.icon

          return(
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                [
                  'h-12 leading-12 transition flex items-center gap-2 justify-center pr-5',
                  isActive
                    ? 'bg-[#C73E3A] font-semibold text-white'
                    : 'text-[#3F312E] hover:bg-[#E8D6D2]',
                ].join(' ')
              }
            >
              <Icon></Icon>{tab.label}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}
