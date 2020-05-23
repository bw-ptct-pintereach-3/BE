const express = require("express");
const jwt = require("jsonwebtoken");
const Articles = require("./articles-model");

const router = express.Router();

////////////////////////////////////////////////////////////////
// gets

router.get("/", (req, res) => {
  Articles.find(req.user.userId)
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Internal server error while retrieving the articles",
      });
    });
});

router.get("/:id", validateId, (req, res) => {
  Articles.findById(req.params.id)
    .then((article) => {
      if (article.user_id === req.user.userId) {
        res.status(200).json(article);
      } else {
        res.status(404).json({ message: "Article not found." });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Internal server error while retrieving the article.",
      });
    });
});

////////////////////////////////////////////////////////////////
// middleware

function validateId(req, res, next) {
  const { id } = req.params;
  Articles.findById(id)
    .then((article) => {
      if (article) {
        req.article = article;
        next();
      } else {
        res.status(404).json({ message: "Article id was not found." });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error.", err });
    });
}

function validateArticleData(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ error: "Request missing url and category." });
  } else if (req.body.url === undefined) {
    res.status(400).json({ error: "Request missing required field: url" });
  } else if (req.body.category === undefined) {
    res.status(400).json({ error: "Request missing required field: category" });
  } else {
    next();
  }
}

module.exports = router;
