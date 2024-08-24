import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import About from './components/About.jsx'
import Contact from'./components/Contact'
import Profile from'./components/Profile.jsx'
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
      path: "/profile",
    element: <Profile/>
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
