const roomRepository = require('../repositories/roomRepository');

// Récupérer toutes les chambres d'un hôtel
exports.getRoomsByHotelId = async (hotelId) => {
  try {
    return await roomRepository.findRoomsByHotelId(hotelId);
  } catch (error) {
    throw new Error('Error in RoomService - getRoomsByHotelId: ' + error.message);
  }
};
exports.getAllRooms = async () => {
  try {
    return await roomRepository.getAllRooms();
  } catch (error) {
    throw new Error('Error in RoomService - getRoomsByHotelId: ' + error.message);
  }
};

// Créer une nouvelle chambre
exports.createRoom = async (roomData) => {
  try {
    return await roomRepository.createRoom(roomData);
  } catch (error) {
    throw new Error('Error in RoomService - createRoom: ' + error.message);
  }
};

// Mettre à jour une chambre
exports.updateRoom = async (id, updateData) => {
  try {
    return await roomRepository.updateRoom(id, updateData);
  } catch (error) {
    throw new Error('Error in RoomService - updateRoom: ' + error.message);
  }
};

// Supprimer une chambre
exports.deleteRoom = async (id) => {
  try {
    return await roomRepository.deleteRoom(id);
  } catch (error) {
    throw new Error('Error in RoomService - deleteRoom: ' + error.message);
  }
};
