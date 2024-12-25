const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  products: {
    type: DataTypes.JSON,
    allowNull: false,
    validate: {
      isValidProducts(value) {
        if (!Array.isArray(value)) {
          throw new Error('Products must be an array');
        }
        if (!value.every(product => 
          product.productId && 
          typeof product.productId === 'string' && 
          product.quantity && 
          typeof product.quantity === 'number'
        )) {
          throw new Error('Each product must have a productId and quantity');
        }
      }
    }
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  status: {
    type: DataTypes.ENUM('Beklemede', 'İşleniyor', 'Kargoda', 'Tamamlandı', 'İptal Edildi'),
    allowNull: false,
    defaultValue: 'Beklemede'
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true
});

module.exports = Order;
