import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import validate from '../middleware/validation.js';
import { registerSchema, loginSchema } from '../validators/userValidator.js';

const router = express.Router();

// Define user routes
router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);

export default router;
