const db = require("../../data/dbconfig.js");

module.exports = {
  find,
  findById,
};

function find() {
  return db("categories");
}

function findById(id) {
  return find().where("id", id).first();
}