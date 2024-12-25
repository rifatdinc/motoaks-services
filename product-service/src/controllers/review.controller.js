const reviewService = require('../services/review.service');

class ReviewController {
  async getReviewsByProductId(req, res) {
    try {
      const reviews = await reviewService.getReviewsByProductId(req.params.productId);
      res.json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async createReview(req, res) {
    try {
      const review = await reviewService.createReview({
        ...req.body,
        ProductId: req.params.productId
      });
      res.status(201).json(review);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async updateReview(req, res) {
    try {
      const review = await reviewService.updateReview(req.params.id, req.body);
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
      res.json(review);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async deleteReview(req, res) {
    try {
      const success = await reviewService.deleteReview(req.params.id);
      if (!success) {
        return res.status(404).json({ message: 'Review not found' });
      }
      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = new ReviewController();
