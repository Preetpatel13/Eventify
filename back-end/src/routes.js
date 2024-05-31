// // import express from 'express';
// // import { creatEvent, registerUserWithCode } from './controllers.js'; // Import your controller functions

// // const router = express.Router();

// // // Route to create an event
// // router.route('/event').post(creatEvent);

// // // Route to register user with registration code
// // router.route('/register').post(registerUserWithCode);

// // export default router;

// import express from 'express';
// import asyncHandler from 'express-async-handler';
// import User from './models/user.js';

// const router = express.Router();

// router.post('/register', asyncHandler(async (req, res) => {
//     const { name, email } = req.body;
//     const user = new User({ name, email });
//     await user.save();
//     res.status(201).json(user);
// }));

// const generateRandomCode = () => {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let code = '';

//     for (let i = 0; i < 4; i++) {
//         code += characters.charAt(Math.floor(Math.random() * characters.length));
//     }

//     const timestamp = Date.now().toString(36).slice(-2);
//     code += timestamp;
//     return code;
// };

// router.post('/create', asyncHandler(async (req, res) => {
//     const { eventName, maxParticipants, description, image, lastDate, location, organizerId } = req.body;

//     const registrationCode = generateRandomCode();

//     const event = new Event({
//         eventName,
//         maxParticipants,
//         description,
//         image,
//         lastDate,
//         location,
//         organizer: organizerId,
//         registrationCode
//     });

//     await event.save();

//     const user = await User.findById(organizerId);
//     user.createdEvents.push(event._id);
//     await user.save();

//     res.status(201).json({ message: 'Event created successfully', event });
// }));

// router.post('/register', asyncHandler(async (req, res) => {
//     const { eventCode, userId } = req.body;
    
//     const event = await Event.findOne({ registrationCode: eventCode });
//     if (!event) {
//         return res.status(404).json({ message: 'Event not found' });
//     }

//     // Check if the user is already registered
//     if (event.registeredUsers.includes(userId)) {
//         return res.status(400).json({ message: 'User already registered' });
//     }

//     // Check if the event is full
//     if (event.registeredUsers.length >= event.maxParticipants) {
//         return res.status(400).json({ message: 'Event is full' });
//     }

//     event.registeredUsers.push(userId);
//     await event.save();

//     const user = await User.findById(userId);
//     user.joinedEvents.push(event._id);
//     await user.save();

//     res.status(201).json({ message: 'Registered successfully', event });
// }));

// router.get('/registrations/:eventId', asyncHandler(async (req, res) => {
//     const { eventId } = req.params;
//     const event = await Event.findById(eventId).populate('registeredUsers');
    
//     if (!event) {
//         return res.status(404).json({ message: 'Event not found' });
//     }

//     res.status(200).json(event.registeredUsers);
// }));



// export default router;


