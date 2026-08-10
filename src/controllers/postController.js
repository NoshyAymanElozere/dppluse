import Post from '../models/Post.js';

/**
 * @desc    Fetch a single blog post by its unique slug
 * @route   GET /api/posts/:slug
 * @access  Public
 */
export const getPostBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const post = await Post.findOne({ slug: slug.toLowerCase() });

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Blog post not found',
            });
        }

        res.status(200).json({
            success: true,
            data: post,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

/**
 * @desc    Create a new blog post (for admins)
 * @route   POST /api/posts
 * @access  Admin/Private
 */
export const createPost = async (req, res) => {
    try {
        const { slug, category, title, subtitle, coverImage, author, readTime, publishedAt, content } = req.body;

        // Check unique slug constraint
        const existingPost = await Post.findOne({ slug: slug.toLowerCase() });
        if (existingPost) {
            return res.status(400).json({
                success: false,
                message: 'A post with this slug already exists. Please choose a unique slug.',
            });
        }

        const newPost = new Post({
            slug: slug.toLowerCase(),
            category,
            title,
            subtitle,
            coverImage,
            author,
            readTime,
            publishedAt,
            content,
        });

        await newPost.save();

        res.status(201).json({
            success: true,
            message: 'Blog post created successfully',
            data: newPost,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

/**
 * @desc    Fetch all blog posts
 * @route   GET /api/posts
 * @access  Public
 */
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ publishedAt: -1 });
        res.status(200).json({
            success: true,
            count: posts.length,
            data: posts,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export default {
    getPostBySlug,
    createPost,
    getAllPosts,
};
