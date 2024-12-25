const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const slugify = require('slugify');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  parentId: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'Categories',
      key: 'id'
    }
  }
}, {
  timestamps: true,
  hooks: {
    beforeValidate: (category) => {
      if (category.name && !category.slug) {
        category.slug = slugify(category.name, { lower: true });
      }
    }
  }
});

// Self-referential relationship for subcategories
Category.hasMany(Category, { as: 'subcategories', foreignKey: 'parentId' });
Category.belongsTo(Category, { as: 'parent', foreignKey: 'parentId' });

module.exports = Category;
