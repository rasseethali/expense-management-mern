// middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("Auth middleware - token present:", !!token);

  if (!token) {
    console.log("No token provided");
    return res.status(401).json("Login first");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 👈 id & role here
    console.log("Token verified for user:", decoded.id);
    next();
  } catch (err) {
    console.log("Invalid token:", err.message);
    res.status(401).json("Invalid token");
  }
};
