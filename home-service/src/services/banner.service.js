const bannerRepository = require('../repositories/banner.repository');
const sequelize = require('../config/database');

class BannerService {
  async getActiveBanners() {
    return await bannerRepository.findAll({
      where: { active: true },
      order: [['order', 'ASC']],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
  }

  async getAllBanners() {
    return await bannerRepository.findAll({
      order: [['order', 'ASC']],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
  }

  async getBannerById(id) {
    return await bannerRepository.findById(id);
  }

  async createBanner(bannerData) {
    return await bannerRepository.create(bannerData);
  }

  async updateBanner(id, bannerData) {
    return await bannerRepository.update(id, bannerData);
  }

  async deleteBanner(id) {
    return await bannerRepository.delete(id);
  }

  async reorderBanners(orders) {
    try {
      await sequelize.transaction(async (t) => {
        await bannerRepository.updateOrder(orders, t);
      });

      return await this.getAllBanners();
    } catch (error) {
      throw new Error('Failed to reorder banners');
    }
  }

  async initializeDefaultBanners() {
    const count = await bannerRepository.count();
    if (count === 0) {
      const defaultBanners = [
        {
          title: "Kasklarda %20 İndirim!",
          description: "Seçili kask modellerinde büyük indirim fırsatı",
          image: "/placeholder.svg?height=400&width=1200",
          link: "/categories/helmets",
          order: 1
        },
        {
          title: "Ücretsiz Kargo Fırsatı",
          description: "1000 TL ve üzeri alışverişlerde kargo bedava",
          image: "/placeholder.svg?height=400&width=1200",
          link: "/products",
          order: 2
        },
        {
          title: "Yeni Sezon Mont Koleksiyonu",
          description: "2024 yılının en yeni mont modelleri",
          image: "/placeholder.svg?height=400&width=1200",
          link: "/categories/jackets",
          order: 3
        }
      ];

      await bannerRepository.bulkCreate(defaultBanners);
      console.log('Default banners initialized');
    }
  }
}

module.exports = new BannerService();
