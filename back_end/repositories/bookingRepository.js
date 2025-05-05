const Booking = require('../models/Booking');


exports.getBookings = async () => {
  try {
    return await Booking.find()
      .populate('rooms', 'type price') // populate only 'type' and 'price' fields of rooms
      .exec();
  } catch (error) {
    throw new Error('Error fetching all Bookings: ' + error.message);
  }
};


// Créer une nouvelle réservation
exports.createBooking = async (bookingData) => {
  try {
    const booking = new Booking(bookingData);  // Créer une nouvelle instance de réservation avec les données fournies
    return await booking.save();  // Sauvegarder la réservation dans la base de données
  } catch (error) {
    throw new Error('Error creating booking: ' + error.message);
  }
};

// Mettre à jour une réservation (par exemple, modifier la date ou le statut)
exports.updateBooking = async (id, updateData) => {
  try {
    return await Booking.findByIdAndUpdate(id, updateData, { new: true });  // Met à jour une réservation
  } catch (error) {
    throw new Error('Error updating booking: ' + error.message);
  }
};

// Supprimer une réservation
exports.deleteBooking = async (id) => {
  try {
    return await Booking.findByIdAndDelete(id);  // Supprimer une réservation par ID
  } catch (error) {
    throw new Error('Error deleting booking: ' + error.message);
  }
};
