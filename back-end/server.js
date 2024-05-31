import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import asyncHandler from "./src/handler.js";
import userRoutes from "./src/userRoute.js";
import eventRoutes from "./src/eventRoute.js";
import { Event } from "./src/user.models.js";
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use('/users', userRoutes);
app.use('/events', eventRoutes);

// Route to handle POST requests to store data
// const postData = asyncHandler(async (req, res) => {
//     try {
//         console.log('Request Body:', req.body);
//         console.log('Uploading');
//         const { name, age } = req.body;

//         const data = await Data.create({ name, age });

//         res.status(201).json({ message: 'Data stored successfully', data });
//     } catch (error) {
//         console.error('Error storing data:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.post('/data', postData);

// Code for creating an event in database
// export const creatEvent = asyncHandler(async (req, res) => {
//     try {
//         const {
//             eventName,
//             maxParticipants,
//             description,
//             image,
//             lastDate,
//             location,
//         } = req.body;

//         console.log(eventName, maxParticipants, description, image, lastDate);

//         const registrationCode = await generateRandomCode();
//         console.log(registrationCode, maxParticipants, description, image);

//         const event = new Event({
//             eventName,
//             maxParticipants,
//             description,
//             image,
//             lastDate,
//             location,
//             registrationCode // Assign the generated code to the event
//         });

//         // Save the event to the database
//         await event.save();

//         // Return the event details and registration code
//         res.status(201).json({ message: 'Event created successfully', event, registrationCode });
//     } catch (error) {
//         console.error('Error creating event:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// const generateRandomCode = () => {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let code = '';

//     for (let i = 0; i < 4; i++) { // Adjust length as per your requirement
//         code += characters.charAt(Math.floor(Math.random() * characters.length));
//     }

//     const timestamp = Date.now().toString(36).slice(-2); // Get last 2 characters of base36 timestamp
//     code += timestamp;
//     return code;
// };

// app.post('/bata', creatEvent);
app.get('/eventss', async (req, res) => {
    try {
      // Retrieve events data from MongoDB using the Event model
      const events = await Event.find();
  
      // Send the events data as the response
      res.json(events);
    } catch (error) {
      // If an error occurs during the database operation, handle it
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/user-events', asyncHandler(async (req, res) => {
    const userID = req.userID; // Assuming you get the userId from middleware
  
    const user = await User.findById(userID)
      .populate('createdEvents')
      .populate('joinedEvents');
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    res.json({
      createdEvents: user.createdEvents,
      joinedEvents: user.joinedEvents,
    });
  }));
    
// Start the server
export { app };
