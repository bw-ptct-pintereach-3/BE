const express = require("express");
const Articles = require("./articles-model");

const router = express.Router();

////////////////////////////////////////////////////////////////
// gets

router.get("/", (req, res) => {
  Articles.find(req.user.userId)
    .then((articles) => {
      if (articles.length !== 0) {
        res.status(200).json(articles);
      } else {
        res.status(204).json({ message: "No articles found for this user." });
      }
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
      res.status(200).json(article);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Internal server error while retrieving the article.",
      });
    });
});

////////////////////////////////////////////////////////////////
// posts

router.post("/", validateArticleData, (req, res) => {
  const newArticle = req.body;
  newArticle.user_id = req.user.userId;

  Articles.insert(newArticle)
    .then((article) => {
      res.status(201).json(article);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Internal server error while adding the article.",
      });
    });
});

////////////////////////////////////////////////////////////////
// deletes

router.delete("/:id", validateId, (req, res) => {
  Articles.remove(req.params.id)
    .then((count) => {
      res.status(200).json({ message: "The article has been deleted." });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Internal server error while removing the article.",
      });
    });
});

////////////////////////////////////////////////////////////////
// puts

router.put("/:id", validateId, validateArticleData, (req, res) => {
  const editedArticle = req.body;
  editedArticle.user_id = req.user.userId;

  Articles.update(req.params.id, editedArticle)
    .then((article) => {
      res.status(200).json(article);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Internal server error while updating the article.",
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
        if (article.user_id === req.user.userId) {
          req.article = article;
          next();
        } else {
          res.status(401).json({
            error:
              "The article id is not associated with this user.",
          });
        }
      } else {
        res.status(404).json({ error: "The article id was not found." });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal server error while verifying the article's id." });
    });
}

function validateArticleData(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ error: "Request missing url and category." });
  } else if (req.body.url === undefined) {
    res.status(400).json({ error: "Request missing required field: url" });
  } else if (req.body.category_id === undefined) {
    res
      .status(400)
      .json({ error: "Request missing required field: category_id" });
  } else if (req.body.url === '') {
    res.status(400).json({ error: "The url cannot be an empty string." });
  } else if (req.body.category_id > 10 || req.body.category_id < 1) {
    res.status(400).json({ error: "The category_id must be in the range of 1 to 10." });
  }
  else {
    next();
  }
}

module.exports = router;
