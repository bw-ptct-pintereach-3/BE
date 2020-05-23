const jwt = require("jsonwebtoken");
require("dotenv").config();

// secrets.js module.exports { JWTSecret = process.env.SECRET || 'willy wonkas wonkalicious wonks' }
const secret = process.env.JWT_SECRET || "willy wonkas wonkalicious wonks";

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    console.log(token);
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.status(401).json({ message: "Invalid Credentials." });
      } else {
        req.user = {
          username: decodedToken.username,
        };
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No token provided." });
  }
};
