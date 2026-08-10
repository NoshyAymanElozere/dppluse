import express from 'express';
import { getPostBySlug, createPost, getAllPosts } from '../controllers/postController.js';
import validate from '../middleware/validation.js';
import { createPostSchema } from '../validators/postValidator.js';

const router = express.Router();

// Route to fetch all posts
router.get('/', getAllPosts);

// Route to fetch a post by slug
router.get('/:slug', getPostBySlug);

// Route to create a new post (validated using Joi)
router.post('/', validate(createPostSchema), createPost);

export default router;
