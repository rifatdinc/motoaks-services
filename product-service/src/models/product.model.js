const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Review = require('./review.model');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  images: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: []
  },
  specs: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {}
  }
});

Product.hasMany(Review);
Review.belongsTo(Product);

module.exports = Product;
