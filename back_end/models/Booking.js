const mongoose = require('mongoose');

// Définir le schéma pour la réservation
const bookingSchema = new mongoose.Schema({

  rooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',  // Référence aux chambres réservées
  }],
  customerName: {
    type: String,
    required: true,  // Le nom du client est obligatoire
  },
  customerEmail: {
    type: String,
    required: true,  // L'email du client est obligatoire
  },
  checkInDate: {
    type: Date,
    required: true,  // La date d'arrivée est obligatoire
  },
  checkOutDate: {
    type: Date,
    required: true,  // La date de départ est obligatoire
  },
  totalPrice: {
    type: Number,
    required: true,  // Le prix total de la réservation
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Canceled'],
    default: 'Pending',  // Statut initial de la réservation (en attente)
  },
  createdAt: {
    type: Date,
    default: Date.now,  // La date de création de la réservation
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
