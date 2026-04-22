
import { createBrowserRouter } from 'react-router-dom'
import Show from './show'
import Search from './Search'
import Layout from '../pages/Layout'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout />,
    children:[
      {
        index:true ,
        element:<Show></Show>
      },
      {
        path:'/search',
        element:<Search></Search>
      }

    ]
  },
  {
    path:'/AI',
    element:<Search/> // 想接入AI，待补充
  }
])

export default router