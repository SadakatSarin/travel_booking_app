import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // Hotel, Cabin, Resort
  city: { type: String, required: true },
  address: { type: String, required: true },
  distance: { type: String, required: true },
  photos: { type: [String] }, // Array of image URLs
  title: { type: String, required: true },
  desc: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5 },
  rooms: { type: [String] }, // We will store Room IDs here later
  cheapestPrice: { type: Number, required: true },
  featured: { type: Boolean, default: false },
});

export default mongoose.model("Hotel", HotelSchema);