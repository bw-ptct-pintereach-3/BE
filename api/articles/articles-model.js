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

async function insert(article) {
  const insertedId = await db("articles").insert(article);
  return findById(insertedId);
}

async function update(id, changes) {
  const updatedId = await db("articles").where({ id }).update(changes);
  return findById(updatedId);
}

function remove(id) {
  return db("articles").where("id", id).del();
}
