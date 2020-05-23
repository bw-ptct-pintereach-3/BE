const db = require("../../data/dbConfig.js");

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};

function find(userId) {
  return db("articles").where("user_id", userId);
}

function findById(id) {
  return db("articles").where("id", id).first();
}

function insert(article) {
  return db("articles")
    .insert(article)
    .then((ids) => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  return db("articles").where({ id }).update(changes);
}

function remove(id) {
  return db("articles").where("id", id).del();
}
