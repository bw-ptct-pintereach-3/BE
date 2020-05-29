const bcrypt = require("bcryptjs");
require("dotenv").config();

const hashCount = parseInt(process.env.HASH_COUNT) || 8;

exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        { username: "note", password: bcrypt.hashSync("pw", hashCount) },
        { username: "song", password: bcrypt.hashSync("pw", hashCount) },
      ]);
    });
};
