// back_end/routes/index.js
const express = require('express');
const router = express.Router();

// Import controllers

const bookingController = require('../controllers/bookingController');
const roomController = require('../controllers/roomController');

// Booking routes
router.post('/bookings', bookingController.createBooking);
router.get('/bookings', bookingController.getBookings);
router.put('/bookings/:id', bookingController.updateBooking);
router.delete('/bookings/:id', bookingController.deleteBooking);

// Room routes
router.post('/rooms', roomController.createRoom);
router.get('/rooms/:id', roomController.getRoomsByHotelId);
router.get('/rooms', roomController.getAllRooms);
router.put('/rooms/:id', roomController.updateRoom);
router.delete('/rooms/:id', authenticate, checkRole('admin'), roomController.deleteRoom);

module.exports = router;