import express from 'express';
import asyncHandler from './handler.js';
import { Event, User } from './user.models.js';

const router = express.Router();

const generateRandomCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';

  for (let i = 0; i < 4; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  const timestamp = Date.now().toString(36).slice(-2);
  code += timestamp;
  return code;
};

router.post('/create', asyncHandler(async (req, res) => {
  const { username, email, eventName, maxParticipants, description, image, lastDate, location, organizerId, registeredUsers } = req.body;

  const registrationCode = generateRandomCode();

  const existingEvent = await Event.findOne({ eventName });
  const existingUser = await User.findOne({ email });

  if (existingEvent) {
    return res.status(400).json({ message: 'Event name must be unique' });
  }
  
  const event = new Event({
    username,
    email,
    eventName,
    maxParticipants,
    description,
    image,
    lastDate,
    location,
    organizer: organizerId,
    registrationCode,
    registeredUsers
  });

  existingUser.createdEvents.push(event._id);
  await existingUser.save();
  await event.save();

  res.status(201).json({ message: 'Event created successfully', event });
}));


router.post('/register', asyncHandler(async (req, res) => {
    const { eventCode } = req.body;
    const { userID } = req.body; // Pass user ID from the frontend

    
    console.log(eventCode,userID);
    const event = await Event.findOne({ registrationCode: eventCode });

    if (!event) {
        return res.status(404).json({ message: 'Invalid event code' });
    }

    const user = await User.findById(userID);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (event.registeredUsers.includes(user._id)) {
        return res.status(400).json({ message: 'User is already registered for this event' });
    }

    // Check if the event is full
    if (event.registeredUsers.length >= event.maxParticipants) {
        return res.status(400).json({ message: 'Event is full' });
    }

    // Add event ID to the user's joinedEvents array
    if (!user.joinedEvents.includes(event._id)) {
        user.joinedEvents.push(event._id);
    }

    // Add user ID to the event's registeredUsers array
    if (!event.registeredUsers.includes(user._id)) {
        event.registeredUsers.push(user._id);
    }

    await user.save();
    await event.save();

    res.status(200).json({ message: 'User registered successfully', user });
}));

// for finding users joined and created events

router.post('/user-events', asyncHandler(async (req, res) => {
    const { userID } = req.body; // Extract userID from the request body
    console.log(userID);

    const user = await User.findById(userID)
        .populate({
            path: 'createdEvents',
            select: 'eventName' // Only select the fields you need
        })
        .populate({
            path: 'joinedEvents',
            select: 'eventName' // Only select the fields you need
        });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json({
        createdEvents: user.createdEvents,
        joinedEvents: user.joinedEvents,
    });
}));

  

export default router;
