const { body } = require('express-validator');

const bannerValidation = {
  create: [
    body('title').notEmpty().trim().withMessage('Title is required'),
    body('description').notEmpty().trim().withMessage('Description is required'),
    body('image').notEmpty().trim().withMessage('Image URL is required'),
    body('link').notEmpty().trim().withMessage('Link is required'),
    body('active').optional().isBoolean().withMessage('Active must be a boolean'),
    body('order').optional().isInt().withMessage('Order must be an integer')
  ],

  update: [
    body('title').optional().trim(),
    body('description').optional().trim(),
    body('image').optional().trim(),
    body('link').optional().trim(),
    body('active').optional().isBoolean().withMessage('Active must be a boolean'),
    body('order').optional().isInt().withMessage('Order must be an integer')
  ],

  reorder: [
    body('orders').isArray().withMessage('Orders must be an array'),
    body('orders.*.id').isInt().withMessage('Banner ID must be an integer'),
    body('orders.*.order').isInt().withMessage('Order must be an integer')
  ]
};

module.exports = bannerValidation;
