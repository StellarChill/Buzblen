import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import About from './components/About.jsx'
import Contact from'./components/Contact'
import Login from './components/Login.jsx'
import Homepage from'./components/Homepage.jsx'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from './components/Register.jsx'
const router = createBrowserRouter([
    {
      path: "/",
    element: <Homepage/>
    },
    {
      path: "/about",
    element: <About/>
    },
    {
      path: "/login",
    element: <Login/>
    },
    {
      path: "/contact",
    element: <Contact/>
    },
    {
      path: "/register",
    element: <Register/>
    }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
