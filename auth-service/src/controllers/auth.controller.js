const authService = require('../services/auth.service');

class AuthController {
  async register(req, res) {
    try {
      const token = await authService.register(req.body);
      res.status(201).json({ token });
    } catch (error) {
      if (error.message === 'User already exists') {
        return res.status(400).json({ message: error.message });
      }
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await authService.login(email, password);
      res.json({ token });
    } catch (error) {
      if (error.message === 'Invalid credentials') {
        return res.status(400).json({ message: error.message });
      }
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async health(req, res) {
    res.status(200).json({ status: 'OK', service: 'auth-service' });
  }
}

module.exports = new AuthController();
