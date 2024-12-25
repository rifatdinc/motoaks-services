const bannerService = require('../services/banner.service');

class BannerController {
  async getActiveBanners(req, res) {
    try {
      const banners = await bannerService.getActiveBanners();
      res.json(banners);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getAllBanners(req, res) {
    try {
      const banners = await bannerService.getAllBanners();
      return res.status(200).send(banners);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getBannerById(req, res) {
    try {
      const banner = await bannerService.getBannerById(req.params.id);
      if (!banner) {
        return res.status(404).json({ message: 'Banner not found' });
      }
      res.json(banner);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async createBanner(req, res) {
    try {
      const banner = await bannerService.createBanner(req.body);
      res.status(201).json(banner);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async updateBanner(req, res) {
    try {
      console.log('Update Banner Request:', {
        id: req.params.id,
        body: req.body
      });
      
      const banner = await bannerService.updateBanner(req.params.id, req.body);
      if (!banner) {
        return res.status(404).json({ message: 'Banner not found' });
      }
      
      console.log('Banner Updated:', banner);
      res.json(banner);
    } catch (error) {
      console.error('Update Banner Error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async deleteBanner(req, res) {
    try {
      const success = await bannerService.deleteBanner(req.params.id);
      if (!success) {
        return res.status(404).json({ message: 'Banner not found' });
      }
      res.json({ message: 'Banner deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async reorderBanners(req, res) {
    try {
      const updatedBanners = await bannerService.reorderBanners(req.body.orders);
      res.json(updatedBanners);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message || 'Server error' });
    }
  }

  async health(req, res) {
    res.status(200).json({ status: 'OK', service: 'home-service' });
  }
}

module.exports = new BannerController();
