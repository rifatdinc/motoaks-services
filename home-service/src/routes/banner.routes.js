const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/banner.controller');
const bannerValidator = require('../validators/banner.validator');
const { validate } = require('../middlewares/validator.middleware');

router.get('/banners', bannerController.getActiveBanners);
router.get('/banners/all', bannerController.getAllBanners);
router.get('/banners/:id', bannerController.getBannerById);
router.post('/banners', validate(bannerValidator.create), bannerController.createBanner);
router.put('/banners/:id', validate(bannerValidator.update), bannerController.updateBanner);
router.delete('/banners/:id', bannerController.deleteBanner);
router.patch('/banners/reorder', validate(bannerValidator.reorder), bannerController.reorderBanners);
router.get('/health', bannerController.health);

module.exports = router;
