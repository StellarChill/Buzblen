import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import backgroundImage from '../Picture/little-house.gif';

function Login() {
  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };
  return (
    <div style={divStyle}>
      <Navbar />
      <div className="container mx-auto p-4 md:p-6">
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
          <form>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-black dark:text-black">Email address</label>
              <input
                type="email"
                id="email"
                className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Buzzblen@gmail.com"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-black dark:text-black">Password</label>
              <input
                type="password"
                id="password"
                className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="•••••••••"
                required
              />
            </div>
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-white focus:ring-3 focus:ring-blue-300 dark:bg-white dark:border-gray-600 dark:focus:ring-blue-600"
                />
              </div>
              <label htmlFor="remember" className="ms-2 text-sm font-medium text-black dark:text-black">
                Remember me
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default Login;

