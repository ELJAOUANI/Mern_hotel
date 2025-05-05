const authService = require('../services/authService');

// Inscription d'un utilisateur
exports.register = async (req, res) => {
  console.log(req.body);
  const { email, password, name, role } = req.body; 

  try {
    const newUser = await authService.register(email, password,name, role);  // Pass only the necessary fields
    res.status(201).json({
      message: 'User registered successfully',
      user: newUser
    });
  } catch (error) {

    res.status(400).json({ message: error.message });
  }
};

// Connexion d'un utilisateur
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token, user } = await authService.login(email, password);
    
    res.status(200).json({
      message: 'Login successful',
      token,
      user
    });
    
  } catch (error) {
    if (error.message === 'User not found' || error.message === 'Invalid credentials') {
      console.warn(`Login failed for ${email}: ${error.message}`);
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
