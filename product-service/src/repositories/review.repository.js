const Review = require('../models/review.model');

class ReviewRepository {
  async findByProductId(productId) {
    return await Review.findAll({
      where: { ProductId: productId }
    });
  }

  async create(reviewData) {
    return await Review.create(reviewData);
  }

  async update(id, reviewData) {
    const review = await Review.findByPk(id);
    if (!review) return null;
    return await review.update(reviewData);
  }

  async delete(id) {
    const review = await Review.findByPk(id);
    if (!review) return false;
    await review.destroy();
    return true;
  }
}

module.exports = new ReviewRepository();
