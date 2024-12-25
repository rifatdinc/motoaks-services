const categoryRepository = require('../repositories/category.repository');

class CategoryService {
  async getAllCategories() {
    return await categoryRepository.getRootCategories();
  }

  async getCategoryById(id) {
    return await categoryRepository.findById(id, {
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

  async getCategoryBySlug(slug) {
    return await categoryRepository.findBySlug(slug, {
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

  async createCategory(categoryData) {
    return await categoryRepository.create(categoryData);
  }

  async updateCategory(id, categoryData) {
    return await categoryRepository.update(id, categoryData);
  }

  async deleteCategory(id) {
    return await categoryRepository.delete(id);
  }

  async initializeDefaultCategories() {
    const count = await categoryRepository.findAll();
    if (count.length === 0) {
      const defaultCategories = [
        {
          id: '1',
          name: 'Egzoz Sistemleri',
          slug: 'egzoz-sistemleri',
          imageUrl: 'https://images.unsplash.com/photo-1589642380614-4a8c2147b857?auto=format&fit=crop&q=80&w=600',
          parentId: null
        },
        {
          id: '1-1',
          name: 'Sport Egzoz',
          slug: 'sport-egzoz',
          imageUrl: 'https://images.unsplash.com/photo-1589642380614-4a8c2147b857?auto=format&fit=crop&q=80&w=600',
          parentId: '1'
        },
        {
          id: '1-2',
          name: 'Racing Egzoz',
          slug: 'racing-egzoz',
          imageUrl: 'https://images.unsplash.com/photo-1589642380614-4a8c2147b857?auto=format&fit=crop&q=80&w=600',
          parentId: '1'
        },
        {
          id: '1-3',
          name: 'Slip-On Egzoz',
          slug: 'slip-on-egzoz',
          imageUrl: 'https://images.unsplash.com/photo-1589642380614-4a8c2147b857?auto=format&fit=crop&q=80&w=600',
          parentId: '1'
        },
        {
          id: '2',
          name: 'Aydınlatma',
          slug: 'aydinlatma',
          imageUrl: 'https://images.unsplash.com/photo-1580310614729-ccd69652491d?auto=format&fit=crop&q=80&w=600',
          parentId: null
        },
        {
          id: '2-1',
          name: 'LED Farlar',
          slug: 'led-farlar',
          imageUrl: 'https://images.unsplash.com/photo-1580310614729-ccd69652491d?auto=format&fit=crop&q=80&w=600',
          parentId: '2'
        },
        {
          id: '2-2',
          name: 'Sinyal Lambaları',
          slug: 'sinyal-lambalari',
          imageUrl: 'https://images.unsplash.com/photo-1580310614729-ccd69652491d?auto=format&fit=crop&q=80&w=600',
          parentId: '2'
        },
        {
          id: '2-3',
          name: 'Stop Lambaları',
          slug: 'stop-lambalari',
          imageUrl: 'https://images.unsplash.com/photo-1580310614729-ccd69652491d?auto=format&fit=crop&q=80&w=600',
          parentId: '2'
        },
        {
          id: '3',
          name: 'Kaporta',
          slug: 'kaporta',
          imageUrl: 'https://images.unsplash.com/photo-1547549082-6bc09f2049ae?auto=format&fit=crop&q=80&w=600',
          parentId: null
        },
        {
          id: '3-1',
          name: 'Rüzgarlıklar',
          slug: 'ruzgarliklar',
          imageUrl: 'https://images.unsplash.com/photo-1547549082-6bc09f2049ae?auto=format&fit=crop&q=80&w=600',
          parentId: '3'
        },
        {
          id: '3-2',
          name: 'Çamurluklar',
          slug: 'camurluklar',
          imageUrl: 'https://images.unsplash.com/photo-1547549082-6bc09f2049ae?auto=format&fit=crop&q=80&w=600',
          parentId: '3'
        },
        {
          id: '3-3',
          name: 'Grenajlar',
          slug: 'grenajlar',
          imageUrl: 'https://images.unsplash.com/photo-1547549082-6bc09f2049ae?auto=format&fit=crop&q=80&w=600',
          parentId: '3'
        }
      ];

      await categoryRepository.bulkCreate(defaultCategories);
      console.log('Default categories initialized');
    }
  }
}

module.exports = new CategoryService();
