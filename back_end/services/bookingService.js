const bookingRepository = require('../repositories/bookingRepository');

// Récupérer toutes les réservations d'un hôtel
exports.getBookings = async () => {
  try {
    return await bookingRepository.getBookings();
  } catch (error) {
    throw new Error('Error in BookingService - getBookings: ' + error.message);
  }
};

// Créer une nouvelle réservation
exports.createBooking = async (bookingData) => {
  try {
    return await bookingRepository.createBooking(bookingData);
  } catch (error) {
    throw new Error('Error in BookingService - createBooking: ' + error.message);
  }
};

// Mettre à jour une réservation
exports.updateBooking = async (id, updateData) => {
  try {
    return await bookingRepository.updateBooking(id, updateData);
  } catch (error) {
    throw new Error('Error in BookingService - updateBooking: ' + error.message);
  }
};

// Supprimer une réservation
exports.deleteBooking = async (id) => {
  try {
    return await bookingRepository.deleteBooking(id);
  } catch (error) {
    throw new Error('Error in BookingService - deleteBooking: ' + error.message);
  }
};
