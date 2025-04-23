import jwt from "jsonwebtoken";
import User from "../Models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "kartik";

async function authMiddleware(req, res, next) {
  try {
    let token;

    // 1. Check Authorization header for Bearer token
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // 2. Fallback to token from cookies
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    // 3. If no token found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token missing from headers or cookies",
      });
    }

    // 4. Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // 5. Fetch user and attach to request object
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    console.error("JWT Auth Error:", err.message);
    return res.status(403).json({
      success: false,
      message: "Forbidden: Invalid or expired token",
    });
  }
}

//check if user is admin

function isAdmin(req, res, next) {
  if (req.user && req.user.role === "customer") {
    console.log(req.user.role);
    next();
  }else{
    return res.status(401).json("You are not authorised")
  }
}
export { authMiddleware, isAdmin };
