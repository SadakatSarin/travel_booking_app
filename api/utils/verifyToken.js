import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

// 1. Check if token exists and is valid
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user; // Save user info (id, isAdmin) to request for next steps
    next();
  });
};

// 2. Check if user is the owner OR an admin (for deleting own account)
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    // Check if the logged-in user's ID matches the URL param ID, or if they are admin
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

// 3. Check if user is Admin (for Hotel CRUD)
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};