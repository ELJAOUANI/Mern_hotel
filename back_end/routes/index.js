// back_end/routes/index.js
const express = require('express');
const router = express.Router();

// Import controllers

const bookingController = require('../controllers/bookingController');
const hotelController = require('../controllers/hotelController');
const roomController = require('../controllers/roomController');

// Booking routes
router.post('/bookings', bookingController.createBooking);
router.get('/bookings', bookingController.getBookings);
router.put('/bookings/:id', bookingController.updateBooking);
router.delete('/bookings/:id', bookingController.deleteBooking);


// Hotel routes
router.post('/hotels', hotelController.createHotel);
router.get('/hotels/:id', hotelController.getHotelById);
router.get('/allhotels', hotelController.getAllHotels);
router.put('/hotels/:id', hotelController.updateHotel);
router.delete('/hotels/:id', hotelController.deleteHotel);

// Room routes
router.post('/rooms', roomController.createRoom);
router.get('/rooms/:id', roomController.getRoomsByHotelId);
router.get('/rooms', roomController.getAllRooms);
router.put('/rooms/:id', roomController.updateRoom);
router.delete('/rooms/:id', roomController.deleteRoom);

module.exports = router;