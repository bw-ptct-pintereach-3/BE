const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("../users/users-model");
const generateToken = require("./generateToken");

const router = express.Router();

//register
router.post("/register", (req, res) => {
  const user = req.body;

  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user)
    .then((saved) => {
      res.status(201).json(saved);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Unable to add user to database.",
      });
    });
});

//login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome, ${user.username}!`,
          id: user.id,
          token: token,
        });
      } else {
        res.status(401).json({ error: "Invalid username or password." });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Unable to log user into system." });
    });
});

module.exports = router;
