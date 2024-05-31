import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CogIcon, UserIcon } from '@heroicons/react/solid'; // Importing settings and profile icons

const Navbar = () => {
  // Assuming you have access to the user's information
  const userName = sessionStorage.getItem('userName') || 'userName';

  return (
    <nav className="bg-teal-600 p-4 mt-6 ml-4 mr-4 rounded ">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="text-white flex items-center space-x-2 hover:text-gray-300">
            <span>Home</span>
          </Link>
          <Link to="/Create" className="text-white flex items-center space-x-2 hover:text-gray-300">
            <span>Create</span>
          </Link>
          <Link to="/Events" className="text-white flex items-center space-x-2 hover:text-gray-300">
            <span>Events</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4 text-white">
          <Link to="/settings" className="text-white flex items-center space-x-2 hover:text-gray-300 hidden sm:block">
            <CogIcon className="h-6 w-6" />
          </Link>
          <Link to="/login" className="text-white flex items-center space-x-2 hover:text-gray-300">
            <UserIcon className="h-6 w-6" />
            <span>{userName}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
