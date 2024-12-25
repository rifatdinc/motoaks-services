const productRepository = require('../repositories/product.repository');

class ProductService {
  async getAllProducts() {
    return await productRepository.findAll();
  }

  async getProductById(id) {
    return await productRepository.findById(id);
  }

  async getProductsByCategory(categoryId) {
    return await productRepository.findByCategoryId(categoryId);
  }

  async createProduct(productData) {
    return await productRepository.create(productData);
  }

  async updateProduct(id, productData) {
    return await productRepository.update(id, productData);
  }

  async deleteProduct(id) {
    return await productRepository.delete(id);
  }

  async addReview(productId, reviewData) {
    return await productRepository.addReview(productId, reviewData);
  }

  async updateStock(id, quantity) {
    return await productRepository.updateStock(id, quantity);
  }

  async initializeDefaultProducts() {
    const count = await productRepository.findAll();
    if (count.length === 0) {
      const defaultProducts = [
        {
          id: '1',
          name: 'Akrapovic Egzoz',
          description: 'Yüksek performanslı egzoz sistemi, titanyum alaşımlı gövde yapısı ile hem hafif hem dayanıklı. Derin ve güçlü ses karakteristiği ile motosikletinize sportif bir kimlik kazandırır.',
          price: 5000,
          stock: 10,
          imageUrl: 'https://images.unsplash.com/photo-1589642380614-4a8c2147b857?auto=format&fit=crop&q=80&w=600',
          categoryId: '1',
          images: [
            'https://images.unsplash.com/photo-1589642380614-4a8c2147b857?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1547549082-6bc09f2049ae?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1580310614729-ccd69652491d?auto=format&fit=crop&q=80&w=600'
          ],
          specs: {
            material: 'Titanyum',
            weight: '2.3 kg',
            sound: '98 dB',
            warranty: '2 yıl'
          }
        },
        {
          id: '2',
          name: 'LED Far',
          description: 'Parlak ve enerji tasarruflu LED far, gece sürüşlerinde mükemmel görüş sağlar.',
          price: 1500,
          stock: 20,
          imageUrl: 'https://images.unsplash.com/photo-1580310614729-ccd69652491d?auto=format&fit=crop&q=80&w=600',
          categoryId: '2',
          images: [
            'https://images.unsplash.com/photo-1580310614729-ccd69652491d?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1589642380614-4a8c2147b857?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1547549082-6bc09f2049ae?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=600'
          ],
          specs: {
            type: 'LED',
            power: '55W',
            color: '6000K',
            lifespan: '50,000 saat'
          }
        }
      ];

      for (const product of defaultProducts) {
        const createdProduct = await productRepository.create(product);
        
        // Add default reviews
        if (product.id === '1') {
          await productRepository.addReview(createdProduct.id, {
            user: 'Ahmet Y.',
            rating: 5,
            comment: 'Mükemmel bir ürün, ses kalitesi harika!'
          });
          await productRepository.addReview(createdProduct.id, {
            user: 'Mehmet K.',
            rating: 4,
            comment: 'Montajı biraz zor ama değer.'
          });
          await productRepository.addReview(createdProduct.id, {
            user: 'Ali S.',
            rating: 5,
            comment: 'Tam beklediğim gibi, çok memnunum.'
          });
        } else if (product.id === '2') {
          await productRepository.addReview(createdProduct.id, {
            user: 'Fatma K.',
            rating: 5,
            comment: 'Çok parlak, yolu mükemmel aydınlatıyor.'
          });
          await productRepository.addReview(createdProduct.id, {
            user: 'Emre T.',
            rating: 4,
            comment: 'Kaliteli ürün, montajı kolay.'
          });
        }
      }

      console.log('Default products and reviews initialized');
    }
  }
}

module.exports = new ProductService();
