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
  const id = await db("articles").insert(article);
  console.log(id);
  return db("articles").where({ id }).first();
}

function update(id, changes) {
  return db("articles").where({ id }).update(changes);
}

function remove(id) {
  return db("articles").where("id", id).del();
}
