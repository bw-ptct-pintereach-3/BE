const jwt = require("jsonwebtoken");

function restrict() {
  return (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json(authError);
      }
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
        if (err) {
          return res.status(401).json({ message: "Not logged in." });
        }
        req.token = decodedPayload;

        next();
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = restrict;
