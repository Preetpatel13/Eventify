import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-teal-500 py-8 px-4 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        <div className="md:w-1/3">
          <h2 className="text-lg font-semibold mb-4">About Us</h2>
          <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et libero urna.</p>
        </div>
        <div className="md:w-1/3 mt-4 md:mt-0">
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <p className="text-sm">123 Main Street, City, Country</p>
          <p className="text-sm">contact@example.com</p>
          <p className="text-sm">+123 456 7890</p>
        </div>
        <div className="md:w-1/3 mt-4 md:mt-0">
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex items-center">
            <a href="#" className="text-sm mr-2 hover:underline">Facebook</a>
            <a href="#" className="text-sm mr-2 hover:underline">Twitter</a>
            <a href="#" className="text-sm hover:underline">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
