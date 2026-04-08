import React, { useState,useCallback,useEffect} from 'react'
import { NavLink } from 'react-router-dom'

export default function Footer() {
  // useEffect(()=>{
  // },[TodoscmpCnt])


  return (
    <div className='flex justify-between items-center'>
      <div className=' flex w-full h-13 text-center justify-center items-center'>
        <NavLink
        className={({ isActive }) =>
            isActive ? 'bg-[#D9B036] flex-1 h-full leading-13' : 'flex-1 h-full leading-13'
        }
        to={'/'}
        >查看</NavLink>
        <NavLink
        className={({ isActive }) =>
            isActive ? 'bg-[#D9B036] flex-1 h-full leading-13' : 'flex-1 h-full leading-13'
        }
        to={'/search'}>搜索</NavLink>
      </div>
    </div>
  )
}
