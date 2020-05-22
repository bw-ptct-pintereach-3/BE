exports.up = function (knex) {
  return knex.schema.createTable("categories", (categories) => {
    categories.increments();
    categories.string("category", 128).notNullable().unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("categories");
};
