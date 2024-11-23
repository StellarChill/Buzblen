import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import backgroundImage from '../Picture/little-house.gif';
import { loginUser } from '../api';
import NavbarBL from './NavbarBeforeLogin';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      alert(response.data.message);
      localStorage.setItem('token', response.data.token); // Store token

      // Decode token to check role (optional)
      const userRole = JSON.parse(atob(response.data.token.split('.')[1])).role;

      if (userRole === 'admin') {
        navigate('/homepage'); // Redirect to admin page
      } else {
        navigate('/homepage'); // Redirect to homepage
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Login failed');
    }
  };

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
      <NavbarBL />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container mx-auto p-4 md:p-6">
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Buzzblen@gmail.com"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="•••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-sm text-black">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-700 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
