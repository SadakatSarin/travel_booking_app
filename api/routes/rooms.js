import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability, // <--- Add this import
} from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
// Note: We need the hotelid in the URL to know where to link this room
router.post("/:hotelid", verifyAdmin, createRoom);

// UPDATE ROOM DETAILS
router.put("/:id", verifyAdmin, updateRoom);

// UPDATE ROOM AVAILABILITY (Booking dates)
// Note: This does NOT require verifyAdmin because regular users need to book rooms
router.put("/availability/:id", updateRoomAvailability);

// DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

// GET
router.get("/:id", getRoom);
router.get("/", getRooms);

export default router;