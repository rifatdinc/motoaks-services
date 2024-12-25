const userRepository = require('../repositories/user.repository');
const jwt = require('jsonwebtoken');

class UserService {
  async getAllUsers() {
    return await userRepository.findAll();
  }

  async getUserById(id) {
    return await userRepository.findById(id);
  }

  async createUser(userData) {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }
    return await userRepository.create(userData);
  }

  async updateUser(id, userData) {
    if (userData.email) {
      const existingUser = await userRepository.findByEmail(userData.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error('Email already exists');
      }
    }
    return await userRepository.update(id, userData);
  }

  async deleteUser(id) {
    return await userRepository.delete(id);
  }

  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  }

  async initializeDefaultUsers() {
    const count = await userRepository.findAll();
    if (count.length === 0) {
      const defaultUsers = [
        {
          id: '1',
          email: 'admin@example.com',
          password: 'admin123',
          name: 'Admin User',
          role: 'admin'
        },
        {
          id: '2',
          email: 'user@example.com',
          password: 'user123',
          name: 'Normal User',
          role: 'user'
        }
      ];

      for (const userData of defaultUsers) {
        await userRepository.create(userData);
      }
      console.log('Default users initialized');
    }
  }
}

module.exports = new UserService();
