import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard.jsx';

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events data from the backend
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/eventss');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="grid m-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
};

export default EventsPage;
