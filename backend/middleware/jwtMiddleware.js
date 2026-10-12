const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json("Authorization token missing");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, "secretkey");

    req.payload = decoded.userMail

    next();

  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.status(401).json("Invalid or expired token");
  }
};

module.exports = jwtMiddleware;
