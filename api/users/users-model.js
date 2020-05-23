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

function update(changes, id) {
  return db("users").where({ id }).update(changes);
}

function remove(id) {
  return db("users").where({ id }).del();
}

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove,
};
