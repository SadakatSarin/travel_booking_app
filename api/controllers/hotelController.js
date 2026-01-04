import Hotel from "../models/Hotel.js";

// --- CREATE HOTEL ---
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

// --- UPDATE HOTEL ---
export const updateHotel = async (req, res, next) => {
  try {
    // { new: true } returns the updated version, not the old one
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

// --- DELETE HOTEL ---
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};

// --- GET SINGLE HOTEL ---
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

// --- GET ALL HOTELS ---
export const getHotels = async (req, res, next) => {
  // FIX: Extract 'limit' here so it doesn't get passed to .find()
  const { min, max, limit, ...others } = req.query; 

  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 999 },
    }).limit(req.query.limit); // We use the limit here separately
    
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};