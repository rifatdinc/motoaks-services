const { body } = require('express-validator');

const reviewValidation = {
  create: [
    body('user').notEmpty().trim().withMessage('User is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').notEmpty().trim().withMessage('Comment is required')
  ],

  update: [
    body('user').optional().trim(),
    body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').optional().trim()
  ]
};

module.exports = reviewValidation;
