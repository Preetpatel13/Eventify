import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventCard = ({ event }) => {
  const { id, eventName, description, location, lastDate } = event;
  const [isRegistered, setIsRegistered] = useState(false);
  const [eventCode, setEventCode] = useState('');
  const [showEventCodeInput, setShowEventCodeInput] = useState(false);
  const [randomImage, setRandomImage] = useState('');

  const formatDate = (lastDate) => {
    const date = new Date(lastDate);
    
    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getUTCFullYear();
  
    return `${day}-${month}-${year}`;
  };

  // Array of image URLs
  const images = [
  'https://media.istockphoto.com/id/499517325/photo/a-man-speaking-at-a-business-conference.jpg?s=1024x1024&w=is&k=20&c=iCUzJvudLPi2HnpAAzIVVqgQVAlnI9TigkEcXcH2NY4=',
    'https://media.istockphoto.com/id/1382269943/photo/group-of-diverse-business-people-on-panel-discussion.jpg?s=1024x1024&w=is&k=20&c=tv0xr4ZNPR7gkiUjBHroglAqznFqCyf7-0rDRC55CXw=',
'https://media.istockphoto.com/id/597940046/photo/casual-catering-discussion-meeting-colleagues-concept.jpg?s=1024x1024&w=is&k=20&c=Or6wzUJT2uA9apDSK4rGdN7WZnQnLIKclXkEbuItoBQ=',  
'https://media.istockphoto.com/id/1496375534/photo/woman-presenting-at-a-conference.jpg?s=1024x1024&w=is&k=20&c=q7PkL92FgdLVApgm4NMruBHZxuzUjDCvJcerDRmk3_E=', 
'https://media.istockphoto.com/id/1464430219/photo/giving-notes-on-script.jpg?s=1024x1024&w=is&k=20&c=rwnPXM6NgmKNhdg2AQs5snTIi4kyPmjrZ1g9e_tYjzE=', 
];

  // Function to get a random image from the array
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  // Set a random image on component mount
  useEffect(() => {
    setRandomImage(getRandomImage());
  }, []);

  const handleRegistration = async () => {
    try {
      const userID = sessionStorage.getItem('user._id') ;
      console.log(userID);

      if (showEventCodeInput) {
        await axios.post('http://localhost:8000/events/register', { eventCode ,userID });
      } else {
        setShowEventCodeInput(true);
        return;
      }
      setIsRegistered(true);
      alert('Successfully registered for the event!');
    } catch (error) {
      console.error('Error registering for event:', error);
      alert('An error occurred while registering for the event. Please try again later.');
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-teal-100">
      <img className="w-full" src={randomImage} alt={eventName} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-teal-800">{eventName}</div>
        <p className="text-gray-700 text-base">{description}</p>
        <p className="text-gray-700 text-base">Last Date: {formatDate(lastDate)}</p>
      </div>
      <div className="px-6 py-4">
        {isRegistered ? (
          <button className="bg-teal-300 text-teal-800 font-bold py-2 px-4 rounded" disabled>
            Registered
          </button>
        ) : (
          <>
            {showEventCodeInput ? (
              <div>
                <input
                  type="text"
                  placeholder="Enter event code"
                  value={eventCode}
                  onChange={(e) => setEventCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-teal-300"
                />
                <button
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={handleRegistration}
                >
                  Register
                </button>
              </div>
            ) : (
              <button
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleRegistration}
              >
                Register for Event
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EventCard;
