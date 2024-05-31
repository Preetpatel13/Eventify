import React, { useState } from 'react';
import axios from 'axios';
function RegisterEvent() {
  const [registrationCode, setRegistrationCode] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [gender, setGender] = useState('');

  const handleRegisterEvent = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/main/register', {
        code: registrationCode,
        name,
        email,
        contactNumber,
        gender
      });
      console.log('User registered:', response.data);
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error('Error registering user:', error.response);
      // Handle error, e.g., display an error message
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can submit the registration data to the backend
    console.log({
      registrationCode,
      name,
      email,
      contactNumber,
      gender
    });
    // Reset form fields
    setRegistrationCode('');
    setName('');
    setEmail('');
    setContactNumber('');
    setGender('');
  };

  return (
    <div className="w-full mt-6 flex justify-center bg-white">
      <div className="w-full max-w-lg">
       <h2 className="text-lg text-center font-classic tracking-wider font-bold mb-4">Register for Event</h2>
     <form onSubmit={handleRegisterEvent} className="bg-white shadow-2xl shadow-teal-300 rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registrationCode">Registration Code:</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="registrationCode"
              type="text"
              value={registrationCode}
              onChange={(e) => setRegistrationCode(e.target.value)}
              placeholder="Registration Code"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name:</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNumber">Contact Number:</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="contactNumber"
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Contact Number"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Gender:</label>
            <select
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex items-center justify-start sm:justify-center md:justify-end lg:justify-between xl:justify-around">
            <button className="bg-teal-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Register for Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterEvent;
