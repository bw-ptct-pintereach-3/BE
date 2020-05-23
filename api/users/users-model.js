const db = require("../../data/dbconfig.js");

function find() {
  return db("users").select("id", "username");
}

function findBy(filter) {
  return db("users").where(filter);
}

function findById(id) {
  return db("users").where({ id });
}

async function add(userData) {
  const username = userData.username;
  await db("users").insert(userData);
  return db("users").where({ username }).select("id", "username").first();
}

module.exports = {
  find,
  findBy,
  findById,
  add,
};
