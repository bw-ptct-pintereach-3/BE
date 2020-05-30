const express = require("express");
const Categories = require("./categories-model");

const router = express.Router();

////////////////////////////////////////////////////////////////
// gets

router.get("/", (req, res) => {
  Categories.find()
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Internal server error while retrieving the categories",
      });
    });
});

router.get("/:id", validateId, (req, res) => {
  Categories.findById(req.params.id)
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Internal server error while retrieving the category.",
      });
    });
});

function validateId(req, res, next) {
  if (req.params.id > 10 || req.params.id < 1) {
    res.status(400).json({ error: "The category_id must be in the range of 1 to 10." });
  } else {
    next();
  }
}

module.exports = router;