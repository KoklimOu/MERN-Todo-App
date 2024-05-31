require('dotenv').config(); // Load environment variables from .env file

const express = require('express'); // Import Express framework
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interaction
const cors = require('cors'); // Import CORS middleware
const todoRoutes = require('./routes/todo.routes'); // Import your route handlers
const app = express(); // Create an Express application

// Middleware
app.use(express.json()); // Parse incoming JSON requests and attach the data to req.body
app.use(cors()); // Enable CORS for all routes

// Use the imported routes for handling requests to /api/todos
app.use('/api/todos', todoRoutes);

const uri = process.env.DATABASE_URI; // Get the MongoDB URI from environment variables
const PORT = process.env.PORT || 5000; // Get the port from environment variables or default to 5000

// Connect to the MongoDB database
mongoose.connect(uri)
    .then(() => {
        console.log('Database connected');
        // Start the server after the database connection is established
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(() => {
        console.log("Connection failed");
    });
