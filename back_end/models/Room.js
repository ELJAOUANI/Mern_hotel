const mongoose = require('mongoose');

// Définir le schéma pour la chambre
const roomSchema = new mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',  // Référence à l'entité Hotel (l'hôtel auquel appartient la chambre)
    required: true,
  },
  type: {
    type: String,
    required: true,  // Le type de chambre (ex: "Standard", "Suite", etc.)
  },
  price: {
    type: Number,
    required: true,  // Le prix de la chambre est obligatoire
  },
  available: {
    type: Boolean,
    default: true,  // Par défaut, une chambre est disponible
  },
  description: {
    type: String,
  },
  maxOccupancy: {
    type: Number,
    required: true,  // Nombre maximum de personnes pouvant séjourner dans la chambre
  },
  createdAt: {
    type: Date,
    default: Date.now,  // La date de création de la chambre
  },
});

module.exports = mongoose.model('Room', roomSchema);
