import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import apiRouter from './routes/index.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas Database
connectDB();

// Middlewares
app.use(express.json());

// Main Root route
app.get('/', (req, res) => {
    res.send('hello');
});

// Mounted Routes
app.use('/api', apiRouter);

// Start Server listener
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
