const bcrypt = require("bcryptjs");

exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        { username: "note", password: bcrypt.hashSync("pw", 8) },
        { username: "song", password: bcrypt.hashSync("pw", 8) },
      ]);
    });
};
