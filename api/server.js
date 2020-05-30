const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const restricted = require("../middleware/restricted.js");
const usersRouter = require("./users/users-router.js");
const articlesRouter = require("./articles/articles-router.js");
const categoriesRouter = require("./categories/categories-router.js")
const authRouter = require("./auth/auth-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/users", usersRouter);
server.use("/api/articles", restricted, articlesRouter);
server.use("/api/categories", restricted, categoriesRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong.",
  });
});

module.exports = server;
