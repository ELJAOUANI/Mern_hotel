const Room = require('../models/Room');

// Trouver toutes les chambres d'un hôtel par ID
// exports.findRoomsByHotelId = async (hotelId) => {
//   try {
//     return await Room.find({ hotel: hotelId });  // Recherche toutes les chambres d'un hôtel par ID
//   } catch (error) {
//     throw new Error('Error fetching rooms by hotel ID: ' + error.message);
//   }
// };
exports.getAllRooms = async () => {
  try {
    return await Room.find({}); // Récupérer toutes les chambres sans filtre
  } catch (error) {
    throw new Error('Error fetching all rooms: ' + error.message);
  }
};
// Créer une nouvelle chambre
exports.createRoom = async (roomData) => {
  try {
    const room = new Room(roomData);  // Créer une nouvelle instance de chambre avec les données fournies
    return await room.save();  // Sauvegarder la chambre dans la base de données
  } catch (error) {
    throw new Error('Error creating room: ' + error.message);
  }
};

// Mettre à jour une chambre
exports.updateRoom = async (id, updateData) => {
  try {
    return await Room.findByIdAndUpdate(id, updateData, { new: true });  // Mettre à jour les données d'une chambre
  } catch (error) {
    throw new Error('Error updating room: ' + error.message);
  }
};

// Supprimer une chambre
exports.deleteRoom = async (id) => {
  try {
    return await Room.findByIdAndDelete(id);  // Supprimer une chambre par ID
  } catch (error) {
    throw new Error('Error deleting room: ' + error.message);
  }
};
