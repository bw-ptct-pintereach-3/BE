const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_SECRET || "willy wonkas wonkalicious wonks";

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid Credentials." });
      } else {
        req.user = {
          userId: decodedToken.user_id,
        };
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No token provided." });
  }
};
