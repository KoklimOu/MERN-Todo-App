# MERN Todo App

This is a simple Todo application built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- Create, read, update, and delete todos
- Backend API with standardized responses
- Frontend built with React

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine
- MongoDB installed or access to a MongoDB Atlas account

## Installation

### Backend

1. Clone the repository:

    ```bash
    git clone https://github.com/KoklimOu/MERN-Todo-App.git
    cd backend
    ```

2. Install backend dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add your MongoDB URI:

    ```plaintext
    DATABASE_URI="your_mongodb_uri_here"
    ```

4. Start the backend server:

    ```bash
    npm run dev
    ```

    The server will start on `http://localhost:5000`.