const mongoose = require('mongoose');

// Définir le schéma pour l'hôtel
const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  // Le nom de l'hôtel est obligatoire
  },
  location: {
    type: String,
    required: true,  // L'emplacement de l'hôtel est obligatoire
  },
  description: {
    type: String,
    required: true,  // Une description de l'hôtel est obligatoire
  },
  rooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',  // Référence à l'entité Room (chambres) qui sera une collection séparée
  }],
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 3,  // Une note de base de 3 si aucune note n'est donnée
  },
  createdAt: {
    type: Date,
    default: Date.now,  // La date de création de l'hôtel
  },
});

module.exports = mongoose.model('Hotel', hotelSchema);
