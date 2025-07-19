const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

// --- CORS Configuration ---
// List of allowed origins (your frontend URLs)
const allowedOrigins = [
    'http://localhost:5173', // Your local frontend for development
    'https://student-dashboard-wine-nine.vercel.app' // Your deployed Vercel frontend
];

// The cors package can take the array of allowed origins directly.
// This is the most standard and reliable way to configure it.
app.use(cors({ origin: allowedOrigins }));

// --- End of CORS Configuration ---


// Body parser middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        console.log('Connected to DB:', mongoose.connection.name);
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('MongoDB connection error:', err));
