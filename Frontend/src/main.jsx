import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUp from './Routes/SignUp/SignUp.jsx'
import SignIn from './Routes/SignIn/SignIn.jsx'
import Homepage from './Routes/Homepage/Homepage.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/homepage',
    element: <Homepage/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
