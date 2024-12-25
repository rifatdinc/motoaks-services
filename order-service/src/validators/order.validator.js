const { body } = require('express-validator');

const orderValidation = {
  create: [
    body('userId')
      .notEmpty()
      .withMessage('User ID is required'),
    body('products')
      .isArray()
      .withMessage('Products must be an array')
      .notEmpty()
      .withMessage('Products cannot be empty'),
    body('products.*.productId')
      .notEmpty()
      .withMessage('Product ID is required'),
    body('products.*.quantity')
      .isInt({ min: 1 })
      .withMessage('Quantity must be a positive integer'),
    body('totalAmount')
      .isFloat({ min: 0 })
      .withMessage('Total amount must be a positive number')
  ],

  updateStatus: [
    body('status')
      .isIn(['Beklemede', 'İşleniyor', 'Kargoda', 'Tamamlandı', 'İptal Edildi'])
      .withMessage('Invalid status')
  ]
};

module.exports = orderValidation;
