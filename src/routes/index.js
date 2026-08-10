import express from 'express';
import userRoutes from './userRoutes.js';
import postRoutes from './postRoutes.js';

const router = express.Router();

// Mount routes
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

export default router;
