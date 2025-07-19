const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 8080;


const allowedOrigins = [
    'http://localhost:5173', 
    'https://student-dashboard-wine-nine.vercel.app' 
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));



app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        console.log('Connected to DB:', mongoose.connection.name);
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('MongoDB connection error:', err));
