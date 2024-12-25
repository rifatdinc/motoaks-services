const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const categoryValidator = require('../validators/category.validator');
const { validate } = require('../middlewares/validator.middleware');

router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.get('/categories/slug/:slug', categoryController.getCategoryBySlug);
router.post('/categories', validate(categoryValidator.create), categoryController.createCategory);
router.put('/categories/:id', validate(categoryValidator.update), categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);
router.get('/health', categoryController.health);

module.exports = router;
