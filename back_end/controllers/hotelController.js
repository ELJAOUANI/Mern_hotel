const hotelService = require('../services/hotelService');

// Récupérer tous les hôtels
exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await hotelService.getAllHotels();
    res.status(200).json(hotels);  // Retourne la liste des hôtels
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotels: ' + error.message });
  }
};

// Créer un nouvel hôtel
exports.createHotel = async (req, res) => {
  try {
    const hotelData = req.body;  // Récupérer les données envoyées dans la requête
    const newHotel = await hotelService.createHotel(hotelData);
    res.status(201).json(newHotel);  // Retourner l'hôtel créé avec un code 201
  } catch (error) {
    res.status(500).json({ message: 'Error creating hotel: ' + error.message });
  }
};

// Récupérer un hôtel par ID
exports.getHotelById = async (req, res) => {
  const { id } = req.params;  // Récupérer l'ID de l'hôtel depuis les paramètres de l'URL
  try {
    const hotel = await hotelService.getHotelById(id);
    if (hotel) {
      res.status(200).json(hotel);  // Retourner l'hôtel trouvé
    } else {
      res.status(404).json({ message: 'Hotel not found' });  // Si l'hôtel n'existe pas
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotel: ' + error.message });
  }
};

// Mettre à jour un hôtel
exports.updateHotel = async (req, res) => {
  const { id } = req.params;
  const hotelData = req.body;
  try {
    const updatedHotel = await hotelService.updateHotel(id, hotelData);
    if (updatedHotel) {
      res.status(200).json(updatedHotel);  // Retourner l'hôtel mis à jour
    } else {
      res.status(404).json({ message: 'Hotel not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating hotel: ' + error.message });
  }
};

// Supprimer un hôtel
exports.deleteHotel = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedHotel = await hotelService.deleteHotel(id);
    if (deletedHotel) {
      res.status(200).json({ message: 'Hotel deleted successfully' });
    } else {
      res.status(404).json({ message: 'Hotel not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hotel: ' + error.message });
  }
};
