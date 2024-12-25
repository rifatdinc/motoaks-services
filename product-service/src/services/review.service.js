const reviewRepository = require('../repositories/review.repository');

class ReviewService {
  async getReviewsByProductId(productId) {
    return await reviewRepository.findByProductId(productId);
  }

  async createReview(reviewData) {
    return await reviewRepository.create(reviewData);
  }

  async updateReview(id, reviewData) {
    return await reviewRepository.update(id, reviewData);
  }

  async deleteReview(id) {
    return await reviewRepository.delete(id);
  }
}

module.exports = new ReviewService();
