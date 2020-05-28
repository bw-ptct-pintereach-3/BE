const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("../users/users-model");
const generateToken = require("./generateToken");
require("dotenv").config();

const router = express.Router();

const hashCount = process.env.HASH_COUNT || 8;

//register
router.post("/register", validateUserData, checkUsername, (req, res) => {
  const user = req.body;

  const hash = bcrypt.hashSync(user.password, hashCount);
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
router.post("/login", validateUserData, (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome, ${user.username}!`,
          username: user.username,
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

function checkUsername(req, res, next) {
  const { username } = req.body;

  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user) {
        res.status(401).json({
          error:
            "Username is already taken.",
        });
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal server error adding user." });
    });
}

function validateUserData(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ error: "Request missing username and password." });
  } else if (req.body.username === undefined) {
    res.status(400).json({ error: "Request missing required field: username." });
  } else if (req.body.password === undefined) {
    res.status(400).json({ error: "Request missing required field: password." });
  } else if (req.body.username === '') {
    res.status(400).json({ error: "A username cannot be an empty string." });
  } else if (req.body.password === '') {
    res.status(400).json({ error: "A password cannot be an empty string." });
  } else {
    next();
  }
}

module.exports = router;
