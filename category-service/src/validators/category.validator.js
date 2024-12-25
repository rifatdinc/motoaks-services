const { body } = require('express-validator');

const categoryValidation = {
  create: [
    body('name').notEmpty().trim().withMessage('Name is required'),
    body('imageUrl').notEmpty().trim().withMessage('Image URL is required'),
    body('parentId').optional().isString().withMessage('Parent ID must be a string')
  ],

  update: [
    body('name').optional().trim(),
    body('imageUrl').optional().trim(),
    body('parentId').optional().isString().withMessage('Parent ID must be a string')
  ]
};

module.exports = categoryValidation;
