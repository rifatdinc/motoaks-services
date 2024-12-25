const Banner = require('../models/banner.model');

class BannerRepository {
  async findAll(options = {}) {
    return await Banner.findAll(options);
  }

  async findById(id) {
    return await Banner.findByPk(id);
  }

  async create(bannerData) {
    return await Banner.create(bannerData);
  }

  async update(id, bannerData) {
    const banner = await this.findById(id);
    if (!banner) return null;
    return await banner.update(bannerData);
  }

  async delete(id) {
    const banner = await this.findById(id);
    if (!banner) return false;
    await banner.destroy();
    return true;
  }

  async updateOrder(orders, transaction) {
    const updates = orders.map(({ id, order }) => 
      Banner.update({ order }, { where: { id }, transaction })
    );
    await Promise.all(updates);
  }

  async count() {
    return await Banner.count();
  }

  async bulkCreate(banners) {
    return await Banner.bulkCreate(banners);
  }
}

module.exports = new BannerRepository();
