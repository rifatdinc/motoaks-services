const userService = require('../services/user.service');

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async createUser(req, res) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      if (error.message === 'Email already exists') {
        return res.status(400).json({ message: error.message });
      }
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async updateUser(req, res) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      if (error.message === 'Email already exists') {
        return res.status(400).json({ message: error.message });
      }
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async deleteUser(req, res) {
    try {
      const success = await userService.deleteUser(req.params.id);
      if (!success) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await userService.login(email, password);
      res.json(result);
    } catch (error) {
      if (error.message === 'Invalid credentials') {
        return res.status(401).json({ message: error.message });
      }
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getCurrentUser(req, res) {
    try {
      const user = await userService.getUserById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async health(req, res) {
    res.status(200).json({ status: 'OK', service: 'user-service' });
  }
}

module.exports = new UserController();
