import * as Joi from 'joi';

export const RegistrationValidationSchema = {
    emailSchema: Joi.string()
        .email({ tlds: false })
        .required()
        .messages({
            'string.email': 'Invalid email address.',
            'string.empty': 'Email cannot be empty.'
        }),

    usernameSchema: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.min': 'Username must be at least 3 characters long.',
            'string.max': 'Username must be at most 30 characters long.',
            'string.empty': 'Username cannot be empty.'
        }),

    passwordSchema: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.min': 'Password must be at least 6 characters long.',
            'string.empty': 'Password cannot be empty.'
        })
}

