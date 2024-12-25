const productService = require('../services/product.service');

class ProductController {
  async getAllProducts(req, res) {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getProductById(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getProductsByCategory(req, res) {
    try {
      const products = await productService.getProductsByCategory(req.params.categoryId);
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async createProduct(req, res) {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async updateProduct(req, res) {
    try {
      const product = await productService.updateProduct(req.params.id, req.body);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async deleteProduct(req, res) {
    try {
      const success = await productService.deleteProduct(req.params.id);
      if (!success) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async addReview(req, res) {
    try {
      const review = await productService.addReview(req.params.id, req.body);
      if (!review) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(201).json(review);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async updateStock(req, res) {
    try {
      const product = await productService.updateStock(req.params.id, req.body.quantity);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async health(req, res) {
    res.status(200).json({ status: 'OK', service: 'product-service' });
  }
}

module.exports = new ProductController();
