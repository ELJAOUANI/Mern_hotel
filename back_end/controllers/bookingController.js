const bookingService = require('../services/bookingService');


exports.getBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getBookings();
    res.status(200).json(bookings);  // Retourner les réservations de l'hôtel
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings: ' + error.message });
  }
};

// Créer une nouvelle réservation
exports.createBooking = async (req, res) => {
  try {
    const bookingData = req.body;  // Récupérer les données de la réservation envoyées dans la requête
    const newBooking = await bookingService.createBooking(bookingData);
    res.status(201).json(newBooking);  // Retourner la réservation créée
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking: ' + error.message });
  }
};

// Mettre à jour une réservation
exports.updateBooking = async (req, res) => {
  const { id } = req.params;
  const bookingData = req.body;
  try {
    const updatedBooking = await bookingService.updateBooking(id, bookingData);
    if (updatedBooking) {
      res.status(200).json(updatedBooking);  // Retourner la réservation mise à jour
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking: ' + error.message });
  }
};

// Supprimer une réservation
exports.deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBooking = await bookingService.deleteBooking(id);
    if (deletedBooking) {
      res.status(200).json({ message: 'Booking deleted successfully' });
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking: ' + error.message });
  }
};
