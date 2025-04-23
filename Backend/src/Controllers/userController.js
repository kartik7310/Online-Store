import User from "../Models/User.js";
import jwt from "jsonwebtoken";
async function userRegister(req, res) {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Create user (password will be hashed by the model middleware)
    const user = new User({ name, email, password });
    await user.save();

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
async function userLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Check for input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found ,Please Signup first to continue" });
    }

    // Match password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ✅ Create JWT token
    const token = jwt.sign({ id: user._id }, "kartik", {
      expiresIn: "7d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
const profile = async (req, res) => { 

  
  try {
    // Check if req.user exists
   
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: User not found in request',
      });
    }

    const userProfile = req.user;

    return res.status(200).json({
      success: true,
      message: 'User profile fetched successfully',
      data: userProfile,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Server error while fetching profile',
    });
  }
};



export {  userRegister, userLogin, profile };
