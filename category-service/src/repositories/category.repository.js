const Category = require('../models/category.model');

class CategoryRepository {
  async findAll(options = {}) {
    return await Category.findAll(options);
  }

  async findById(id, options = {}) {
    return await Category.findByPk(id, options);
  }

  async findBySlug(slug, options = {}) {
    return await Category.findOne({ where: { slug }, ...options });
  }

  async create(categoryData) {
    return await Category.create(categoryData);
  }

  async update(id, categoryData) {
    const category = await this.findById(id);
    if (!category) return null;
    return await category.update(categoryData);
  }

  async delete(id) {
    const category = await this.findById(id);
    if (!category) return false;
    await category.destroy();
    return true;
  }

  async bulkCreate(categories) {
    return await Category.bulkCreate(categories);
  }

  async getRootCategories() {
    return await Category.findAll({
      where: { parentId: null },
      include: [{
        model: Category,
        as: 'subcategories',
        include: [{
          model: Category,
          as: 'subcategories'
        }]
      }]
    });
  }
}

module.exports = new CategoryRepository();
