const db = require("../../data/dbconfig.js");

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
  const [id] = await db("articles").insert(article).returning("id");
  return findById(id);
}

async function update(id, changes) {
  await db("articles").where("id", id).update(changes);
  return findById(id);
}

function remove(id) {
  return db("articles").where("id", id).del();
}
