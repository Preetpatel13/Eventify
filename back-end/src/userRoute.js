import express from 'express';
import asyncHandler from './handler.js';
import {User,Event} from './user.models.js';
import mongoose from 'mongoose';
const router = express.Router();

router.post('/login', asyncHandler(async(req, res) => {
    const { name, email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(200).json({ message: 'User with this email already exists', user: existingUser });
    }

    const user = await User.create({
        name,
        email
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully', user });
}));

export default router;
