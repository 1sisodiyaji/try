const { body } = require('express-validator');

exports.userValidate = [
    // Validate 'name'
    body('name')
        .exists()
        .withMessage('name is required')
        .isString()
        .withMessage('name must be a string')
        .isLength({ min: 3, max: 20 })
        .withMessage('Username must be between 3 and 20 characters long'),
    // Validate 'email' with regex pattern matching
    body('email')
        .exists()
        .withMessage('email is required')
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        .withMessage('email must be a valid email')
        .isLength({ max: 100 })
        .withMessage('Email must be less than 100 characters long'),

    // Validate 'password'
    body('password')
        .exists()
        .withMessage('password is required')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters long'),

    // Validate 'mobilenumber' with regex pattern matching
    body('mobilenumber')
        .exists()
        .trim()
        .withMessage('mobilenumber is required')
        .matches(/^[0-9]{10}$/)
        .withMessage('mobilenumber must be a valid 10-digit mobile number'),
];
