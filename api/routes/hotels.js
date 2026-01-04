import express from "express";
import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels, // <--- This is imported correctly
  updateHotel,
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createHotel);

// UPDATE
router.put("/:id", verifyAdmin, updateHotel);

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

// GET SINGLE
// Note: This matches /api/hotels/123
router.get("/find/:id", getHotel); 

// GET ALL
// Note: This matches /api/hotels?featured=true
router.get("/", getHotels); // <--- YOU WERE MISSING THIS LINE!

// GET ROOMS
router.get("/room/:id", getHotelRooms);

export default router;