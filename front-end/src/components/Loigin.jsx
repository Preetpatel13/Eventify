import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/users/login', formData);
      console.log(response.data); // Assuming your backend returns user data upon successful login
      sessionStorage.setItem('user', JSON.stringify(response.data));
      const userData = JSON.parse(sessionStorage.getItem('user'));

      // Extract name and ID from user data
      const userName = userData ? userData.user.name : 'jijo';
      const userID = userData ? userData.user._id : '123';
      sessionStorage.setItem('userName', userName);
      sessionStorage.setItem('userID', userID);

      // Redirect to home page after successful login
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error.response?.data?.message || error.message);
      setErrorMessage('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <h2 className="text-lg text-center font-semibold mb-4">Login Form</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {errorMessage && (
            <div className="mb-4 p-2 text-red-700 border border-red-700 rounded">
              {errorMessage}
            </div>
          )}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring ${errorMessage ? 'border-red-700' : 'focus:ring-teal-300'}`}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring ${errorMessage ? 'border-red-700' : 'focus:ring-teal-300'}`}
            />
          </div>
          <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-md shadow-md hover:bg-teal-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
