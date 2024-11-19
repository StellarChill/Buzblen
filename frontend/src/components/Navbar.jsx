import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <h1 className="text-lg font-bold">My App</h1>
      <div>
        <Link to="/register" className="mr-4 hover:text-gray-300">
          Register
        </Link>
        <Link to="/login" className="hover:text-gray-300">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
