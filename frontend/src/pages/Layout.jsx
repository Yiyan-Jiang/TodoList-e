import { Outlet, Link } from 'react-router-dom';
import Footer from '../component/Footer'


export default function Layout() {

  return (
    <div className='bg-pink-300 w-[80%] h-screen mx-auto flex flex-col'>
      <div 
      className='bg-[#C73E3A] h-20 flex items-center pl-3'>
        <div 
        className='text-4xl flex-1 '>
          简易TodoList
        </div>
      </div>
      
      <div 
      className=' bg-[#F5EFE1] h-200'>
        <main style={{ flex: 1}}>
          <Outlet />  
        </main>
      </div>

      <div
      className='h-14 bg-[#F5EFE1]'>
        <Footer/>
      </div>
    </div>
  );
}