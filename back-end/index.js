import dotenv from "dotenv";
import connectDB from "./src/user.models.js";
import { app } from './server.js';

dotenv.config({
    path: './.env'
});

// Call connectDB and handle the promise using .then() and .catch()
connectDB()
  .then(() => {
    app.listen( 8000, () => {
        console.log(`⚙️ Server is running at port : 8000`);
    });
  })
  .catch((err) => {
    console.log("Something went wrong. MongoDB connection failed: " + err.message);
  });
