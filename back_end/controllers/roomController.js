const roomService = require('../services/roomService');

// Récupérer toutes les chambres d'un hôtel
exports.getRoomsByHotelId = async (req, res) => {
  const { hotelId } = req.params;  // Récupérer l'ID de l'hôtel depuis les paramètres de l'URL
  try {
    const rooms = await roomService.getRoomsByHotelId(hotelId);
    res.status(200).json(rooms);  // Retourner les chambres de l'hôtel
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rooms: ' + error.message });
  }
};
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await roomService.getAllRooms();
    res.status(200).json(rooms);  // Retourner les chambres de l'hôtel
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rooms: ' + error.message });
  }
};

// Créer une nouvelle chambre
exports.createRoom = async (req, res) => {
  try {
    const roomData = req.body;  // Récupérer les données de la chambre envoyées dans la requête
    const newRoom = await roomService.createRoom(roomData);
    res.status(201).json(newRoom);  // Retourner la chambre créée
  } catch (error) {
    res.status(500).json({ message: 'Error creating room: ' + error.message });
  }
};

// Mettre à jour une chambre
exports.updateRoom = async (req, res) => {
  const { id } = req.params;
  const roomData = req.body;
  try {
    const updatedRoom = await roomService.updateRoom(id, roomData);
    if (updatedRoom) {
      res.status(200).json(updatedRoom);  // Retourner la chambre mise à jour
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating room: ' + error.message });
  }
};

// Supprimer une chambre
exports.deleteRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRoom = await roomService.deleteRoom(id);
    if (deletedRoom) {
      res.status(200).json({ message: 'Room deleted successfully' });
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting room: ' + error.message });
  }
};
