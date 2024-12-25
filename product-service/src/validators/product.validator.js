const { body } = require('express-validator');

const productValidation = {
  create: [
    body('name').notEmpty().trim().withMessage('Name is required'),
    body('description').notEmpty().trim().withMessage('Description is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    body('imageUrl').notEmpty().trim().withMessage('Image URL is required'),
    body('categoryId').notEmpty().trim().withMessage('Category ID is required'),
    body('images').isArray().withMessage('Images must be an array'),
    body('specs').isObject().withMessage('Specs must be an object')
  ],

  update: [
    body('name').optional().trim(),
    body('description').optional().trim(),
    body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    body('imageUrl').optional().trim(),
    body('categoryId').optional().trim(),
    body('images').optional().isArray().withMessage('Images must be an array'),
    body('specs').optional().isObject().withMessage('Specs must be an object')
  ],

  addReview: [
    body('user').notEmpty().trim().withMessage('User is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').notEmpty().trim().withMessage('Comment is required')
  ]
};

module.exports = productValidation;
