import Joi from 'joi';

// Joi validation schema for creating a new post
export const createPostSchema = Joi.object({
    slug: Joi.string()
        .required()
        .trim()
        .lowercase()
        .pattern(/^[a-z0-9-_]+$/)
        .messages({
            'string.empty': 'Slug cannot be empty',
            'any.required': 'Slug is required',
            'string.pattern.base': 'Slug can only contain lowercase letters, numbers, hyphens, and underscores',
        }),
    category: Joi.string()
        .required()
        .messages({
            'any.required': 'Category is required',
        }),
    title: Joi.string()
        .required()
        .messages({
            'any.required': 'Title is required',
        }),
    subtitle: Joi.string()
        .required()
        .messages({
            'any.required': 'Subtitle is required',
        }),
    coverImage: Joi.string()
        .uri()
        .required()
        .messages({
            'string.uri': 'Cover image must be a valid URL',
            'any.required': 'Cover image is required',
        }),
    author: Joi.object({
        name: Joi.string().required(),
        avatarUrl: Joi.string().uri().required(),
    }).required(),
    readTime: Joi.string()
        .required()
        .messages({
            'any.required': 'Read time description is required',
        }),
    publishedAt: Joi.date()
        .iso()
        .optional(),
    content: Joi.object({
        sections: Joi.array()
            .items(
                Joi.object({
                    type: Joi.string()
                        .valid('header', 'paragraph', 'quote_card')
                        .required(),
                    text: Joi.string().required(),
                    tag: Joi.string().when('type', {
                        is: 'quote_card',
                        then: Joi.required(),
                        otherwise: Joi.optional(),
                    }),
                })
            )
            .required()
            .min(1),
    }).required(),
});
