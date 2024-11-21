import './cssfile/Navbar1.css';
import './cssfile/Footer.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Login from './components/Login.jsx';
import Homepage from './components/Homepage.jsx';
import Register from './components/Register.jsx';
import Profile from './components/Profile.jsx';
import Addmin from './components/Addmin.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />, // Default page is Login
  },
  {
    path: "/login",
    element: <Login />, // Default page is Login
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: 
        <Profile />
  },
  {
    path: "/addmin",
    element: 
        <Addmin />
  },
  {
    path: "/homepage",
    element: 
        <Homepage />
  
  },
 
  {
    path: "*",
    element: <h1>404 - Page Not Found</h1>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
