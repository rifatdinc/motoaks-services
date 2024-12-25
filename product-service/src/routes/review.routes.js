const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const reviewValidator = require('../validators/review.validator');
const { validate } = require('../middlewares/validator.middleware');

router.get('/products/:productId/reviews', reviewController.getReviewsByProductId);
router.post('/products/:productId/reviews', validate(reviewValidator.create), reviewController.createReview);
router.put('/reviews/:id', validate(reviewValidator.update), reviewController.updateReview);
router.delete('/reviews/:id', reviewController.deleteReview);

module.exports = router;
