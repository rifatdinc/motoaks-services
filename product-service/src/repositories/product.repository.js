const Product = require('../models/product.model');
const Review = require('../models/review.model');

class ProductRepository {
  async findAll(options = {}) {
    return await Product.findAll({
      ...options,
      include: [Review]
    });
  }

  async findById(id, options = {}) {
    return await Product.findByPk(id, {
      ...options,
      include: [Review]
    });
  }

  async findByCategoryId(categoryId, options = {}) {
    return await Product.findAll({
      where: { categoryId },
      ...options,
      include: [Review]
    });
  }

  async create(productData) {
    return await Product.create(productData);
  }

  async update(id, productData) {
    const product = await this.findById(id);
    if (!product) return null;
    return await product.update(productData);
  }

  async delete(id) {
    const product = await this.findById(id);
    if (!product) return false;
    await product.destroy();
    return true;
  }

  async addReview(productId, reviewData) {
    const product = await this.findById(productId);
    if (!product) return null;
    return await Review.create({
      ...reviewData,
      ProductId: productId
    });
  }

  async updateStock(id, quantity) {
    const product = await this.findById(id);
    if (!product) return null;
    return await product.update({
      stock: product.stock - quantity
    });
  }
}

module.exports = new ProductRepository();
