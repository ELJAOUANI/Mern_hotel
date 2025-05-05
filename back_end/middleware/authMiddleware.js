const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  // Extract token from the Authorization header
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token with the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add the decoded user data to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle the case where the token is invalid or expired
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
