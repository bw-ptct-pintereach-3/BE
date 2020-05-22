exports.seed = function (knex) {
  return knex("articles")
    .del()
    .then(function () {
      return knex("articles").insert([
        { url: "https://google.com", category_id: "1", user_id: "1" },
        { url: "https://twitter.com", category_id: "2", user_id: "1" },
        { url: "https://github.com", category_id: "3", user_id: "1" },
        { url: "https://facebook.com", category_id: "4", user_id: "1" },
        { url: "https://slack.com", category_id: "5", user_id: "1" },
        { url: "https://youtube.com", category_id: "6", user_id: "1" },
        { url: "https://github.com", category_id: "7", user_id: "1" },
        { url: "https://facebook.com", category_id: "8", user_id: "1" },
        { url: "https://slack.com", category_id: "9", user_id: "1" },
        { url: "https://youtube.com", category_id: "10", user_id: "1" },
      ]);
    });
};
