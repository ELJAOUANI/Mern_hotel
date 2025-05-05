const hotelRepository = require('../repositories/hotelRepository');

// Récupérer tous les hôtels avec leurs chambres
exports.getAllHotels = async () => {
  try {
    return await hotelRepository.findAllHotels();
  } catch (error) {
    throw new Error('Error in HotelService - getAllHotels: ' + error.message);
  }
};

// Créer un nouvel hôtel
exports.createHotel = async (hotelData) => {
  try {
    return await hotelRepository.createHotel(hotelData);
  } catch (error) {
    throw new Error('Error in HotelService - createHotel: ' + error.message);
  }
};

// Récupérer un hôtel par son ID avec ses chambres
exports.getHotelById = async (id) => {
  try {
    return await hotelRepository.getHotelById(id);
  } catch (error) {
    throw new Error('Error in HotelService - getHotelById: ' + error.message);
  }
};

// Mettre à jour un hôtel
exports.updateHotel = async (id, updateData) => {
  try {
    return await hotelRepository.updateHotel(id, updateData);
  } catch (error) {
    throw new Error('Error in HotelService - updateHotel: ' + error.message);
  }
};

// Supprimer un hôtel
exports.deleteHotel = async (id) => {
  try {
    return await hotelRepository.deleteHotel(id);
  } catch (error) {
    throw new Error('Error in HotelService - deleteHotel: ' + error.message);
  }
};
