const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const productValidator = require('../validators/product.validator');
const { validate } = require('../middlewares/validator.middleware');

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.get('/products/category/:categoryId', productController.getProductsByCategory);
router.post('/products', validate(productValidator.create), productController.createProduct);
router.put('/products/:id', validate(productValidator.update), productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
router.post('/products/:id/reviews', validate(productValidator.addReview), productController.addReview);
router.patch('/products/:id/stock', productController.updateStock);
router.get('/health', productController.health);

module.exports = router;
