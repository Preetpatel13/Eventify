import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserEvents = () => {
  const [createdEvents, setCreatedEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const userID = sessionStorage.getItem('userID');
        console.log(userID);
        const response = await axios.post('http://localhost:8000/events/user-events', { userID });
console.log(response);
        setCreatedEvents(response.data.createdEvents);
        console.log(response.data.createdEvents)
        setJoinedEvents(response.data.joinedEvents);
        console.log(response.data.joinedEvents);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch events.');
        setLoading(false);
      }
    };

    fetchUserEvents();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-teal-800">My Events</h2>
      
      <div>
        <h3 className="text-xl font-semibold mb-2 text-teal-700">Created Events</h3>
        {createdEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {createdEvents.map(event => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-gray-700">No created events found.</p>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2 text-teal-700">Joined Events</h3>
        {joinedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {joinedEvents.map(event => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-gray-700">No joined events found.</p>
        )}
      </div>
    </div>
  );
};

const EventCard = ({ event }) => {
  const { eventName, location } = event;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-teal-100">
      <img className="w-full" src={`https://source.unsplash.com/random/400x200?${eventName}`} alt={eventName} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-teal-800">{eventName}</div>
        <p className="text-gray-700 text-base">Location: {location}</p>
      </div>
    </div>
  );
};

export default UserEvents;
