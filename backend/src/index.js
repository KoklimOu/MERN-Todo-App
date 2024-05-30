require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todo.routes')
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/todos', todoRoutes);

const uri = process.env.DATABASE_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(uri).then(() => {
    console.log('Database connected');   
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    }); 
})
.catch(() => {
    console.log("connection failed");
})

