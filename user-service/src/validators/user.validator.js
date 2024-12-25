const { body } = require('express-validator');

const userValidation = {
  create: [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('name').notEmpty().trim().withMessage('Name is required'),
    body('role').optional().isIn(['admin', 'user']).withMessage('Invalid role')
  ],

  update: [
    body('email').optional().isEmail().withMessage('Invalid email format'),
    body('password')
      .optional()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('name').optional().trim(),
    body('role').optional().isIn(['admin', 'user']).withMessage('Invalid role')
  ],

  login: [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required')
  ]
};

module.exports = userValidation;
