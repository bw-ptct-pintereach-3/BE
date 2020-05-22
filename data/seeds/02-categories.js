exports.seed = function (knex) {
  return knex("categories")
    .del()
    .then(function () {
      return knex("categories").insert([
        { category: "Education" },
        { category: "Recreation" },
        { category: "Cooking" },
        { category: "Shopping" },
        { category: "Technology" },
        { category: "Entertainment" },
        { category: "Professional" },
        { category: "Health" },
        { category: "Sports" },
        { category: "Other" },
      ]);
    });
};
