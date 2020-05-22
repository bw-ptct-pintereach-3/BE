const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = generateToken;

function generateToken(user) {
  const payload = {
    username: user.username,
    id: user.id,
  };

  const secret = process.env.SECRET || "willy wonkas wonkalicious wonks";

  const options = {
    expiresIn: "6h",
  };

  return jwt.sign(payload, secret, options);
}
