import React, { useState } from 'react';
import axios from 'axios';

function CreateEvent() {
  const [eventName, setEventName] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [lastDate, setLastDate] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // You might need to add additional user information, like username, email, organizerId
       // Replace with actual organizer ID
      const organizerId = sessionStorage.getItem('user._id') 
      console.log(organizerId);

      const response = await axios.post('http://localhost:8000/events/create', {
        eventName,
        maxParticipants,
        description,
        image,
        lastDate,
        location,
        organizerId,
        // Add other fields if needed
      });

      console.log('Event created successfully:', response.data);
      alert('Event created successfully!');
      
      // Reset form fields
      setEventName('');
      setMaxParticipants('');
      setDescription('');
      setImage('');
      setLastDate('');
      setLocation('');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('An error occurred while creating the event. Please try again later.');
    }
  };

  return (
    <div className="w-full mt-6 flex justify-center bg-white">
      <div className="w-full max-w-lg">
        <h2 className="text-lg text-center font-serif font-bold tracking-wider mb-4">Create Event</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-2xl shadow-teal-300 rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventName">Event Name:</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="eventName"
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Event Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxParticipants">Max Participants:</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="maxParticipants"
              type="number"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(e.target.value)}
              placeholder="Max Participants"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description:</label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image ID:</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="image"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image ID"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastDate">Last Date to Fill Form:</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="lastDate"
              type="date"
              value={lastDate}
              onChange={(e) => setLastDate(e.target.value)}
              placeholder="Last Date to Fill Form"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Location:</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              required
            />
          </div>
          <div className="flex items-center justify-start sm:justify-center md:justify-end lg:justify-between xl:justify-around">
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
