const Hotel = require('../models/Hotel');
const Room = require('../models/Room');

// Trouver tous les hôtels avec leurs chambres associées
exports.findAllHotels = async () => {
  try {
    return await Hotel.find({}).populate('rooms'); // `populate` permet de récupérer les données des chambres
  } catch (error) {
    throw new Error('Error fetching hotels: ' + error.message);
  }
};

// Créer un nouvel hôtel
exports.createHotel = async (hotelData) => {
  try {
    const hotel = new Hotel(hotelData);  // Créer une nouvelle instance d'hôtel avec les données fournies
    return await hotel.save();  // Sauvegarder l'hôtel dans la base de données
  } catch (error) {
    throw new Error('Error creating hotel: ' + error.message);
  }
};

// Trouver un hôtel par ID avec ses chambres associées
exports.getHotelById = async (id) => {
  try {
    return await Hotel.findById(id).populate('rooms');  // Recherche d'un hôtel par ID avec les chambres associées
  } catch (error) {
    throw new Error('Error fetching hotel by ID: ' + error.message);
  }
};

// Mettre à jour les informations d'un hôtel
exports.updateHotel = async (id, updateData) => {
  try {
    return await Hotel.findByIdAndUpdate(id, updateData, { new: true });  // Met à jour l'hôtel avec les nouvelles données
  } catch (error) {
    throw new Error('Error updating hotel: ' + error.message);
  }
};

// Supprimer un hôtel
exports.deleteHotel = async (id) => {
  try {
    return await Hotel.findByIdAndDelete(id);  // Supprimer un hôtel par son ID
  } catch (error) {
    throw new Error('Error deleting hotel: ' + error.message);
  }
};
