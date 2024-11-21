import React, { useState } from 'react'; // เพิ่ม useState สำหรับจัดการข้อมูลฟอร์ม
import Navbar from './Navbar';
import Footer from './Footer';
import backgroundImage from '../Picture/little-house.gif';
import { registerUser } from '../api';


const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    gender: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบว่ารหัสผ่านตรงกัน
    if (formData.password !== formData.confirm_password) {
      alert('Passwords do not match!');
      return;
    }

    try {
      // ส่งข้อมูลไปยัง API
      const response = await registerUser({
        email: formData.email,
        password: formData.password,
      });

      alert(response.data.message); // แจ้งเตือนเมื่อสำเร็จ
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Registration failed');
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
      <Navbar />
      <div className="container mx-auto p-4 md:p-6">
        <div style={{ background: '#c6b790' }} className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-black">
                  First name
                </label>
                <input
                  type="text"
                  id="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Username"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-black">
                  Last name
                </label>
                <input
                  type="text"
                  id="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Lastname"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-black">
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Phone Number"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  required
                />
              </div>

              {/* Gender */}
              <div className="mb-2">
                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-black">
                  Gender
                </label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  <option value="" disabled>
                    Select your gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
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

            {/* Confirm Password */}
            <div className="mb-6">
              <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-black">
                Confirm password
              </label>
              <input
                type="password"
                id="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="•••••••••"
                required
              />
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-white focus:ring-3 focus:ring-blue-300"
                  required
                />
              </div>
              <label htmlFor="remember" className="ms-2 text-sm font-medium text-black">
                I agree with the{' '}
                <a
                  href="#"
                  style={{ color: 'black' }}
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  terms and conditions
                </a>
                .
              </label>
            </div>

            <button
              type="submit"
              style={{ background: '#8d6f22' }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
