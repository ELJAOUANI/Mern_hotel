const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');  


const register = async (email, password, name, role) => {
  

  try {
    // Check if user already exists
    if (!email || !password || !name) {
      throw new Error('Missing required fields');
    }
  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email already exists');
    }
        // Validate required fields
    
    

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      role: role || 'user', // Default to 'user' role
      name,
    });

    // Save user to the database
    await newUser.save();
    return newUser;

  } catch (error) {
   
    throw error; // Let controller handle the response
    
  }
};

// Se connecter et obtenir un token JWT
const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password Match:', isMatch);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { 
      token, 
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
    
  } catch (error) {
    throw error;
  }
};
module.exports = { register, login };