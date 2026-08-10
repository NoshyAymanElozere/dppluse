import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            enum: ['header', 'paragraph', 'quote_card'],
        },
        text: {
            type: String,
            required: true,
        },
        tag: {
            type: String, // Specifically used in 'quote_card' type
            required: false,
        },
    },
    { _id: false }
);

const postSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            required: [true, 'Slug is required'],
            unique: true,
            trim: true,
            lowercase: true,
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            trim: true,
        },
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        subtitle: {
            type: String,
            required: [true, 'Subtitle is required'],
            trim: true,
        },
        coverImage: {
            type: String,
            required: [true, 'Cover image URL is required'],
        },
        author: {
            name: {
                type: String,
                required: [true, 'Author name is required'],
            },
            avatarUrl: {
                type: String,
                required: [true, 'Author avatar URL is required'],
            },
        },
        readTime: {
            type: String,
            required: [true, 'Read time description is required'],
        },
        publishedAt: {
            type: Date,
            default: Date.now,
        },
        content: {
            sections: {
                type: [sectionSchema],
                required: [true, 'Content sections are required'],
            },
        },
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
