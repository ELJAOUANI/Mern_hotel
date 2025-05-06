const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const allRoutes = require('./routes/index'); // 👈 Import all other routes
const app = express();
const authenticate = require('./middleware/authMiddleware');
const cors = require('cors');
dotenv.config(); // Charger les variables d'environnement

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded forms

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));



  app.use(cors({
    origin: 'http://localhost:5173', // must match your frontend's origin
    credentials: true                // allow cookies and auth headers
  }));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api', authenticate, allRoutes);




// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
