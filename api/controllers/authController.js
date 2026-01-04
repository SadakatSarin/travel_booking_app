import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// --- REGISTER ---
export const register = async (req, res, next) => {
  try {
    // 1. Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // 2. Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // 3. Save to DB
    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

// --- LOGIN ---
export const login = async (req, res, next) => {
  try {
    // 1. Find user by username
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    // 2. Check password
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    // 3. Create Token (JWT)
    // We hide the user ID and isAdmin status inside the token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    // 4. Send response
    // We separate sensitive data (password, isAdmin) from the response object
    const { password, isAdmin, ...otherDetails } = user._doc;
    
    // We send the token in a cookie (httpOnly for security)
    res
      .cookie("access_token", token, {
        httpOnly: true, // Client-side JS cannot read this cookie (security)
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin }); // Send user data back
  } catch (err) {
    next(err);
  }
};