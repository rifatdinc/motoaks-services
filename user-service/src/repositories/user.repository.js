const User = require('../models/user.model');

class UserRepository {
  async findAll() {
    return await User.findAll({
      attributes: { exclude: ['password'] }
    });
  }

  async findById(id) {
    return await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
  }

  async findByEmail(email) {
    return await User.findOne({
      where: { email }
    });
  }

  async create(userData) {
    return await User.create(userData);
  }

  async update(id, userData) {
    const user = await User.findByPk(id);
    if (!user) return null;
    return await user.update(userData);
  }

  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) return false;
    await user.destroy();
    return true;
  }
}

module.exports = new UserRepository();
