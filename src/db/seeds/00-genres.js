/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// const genres = require("../fixtures/genres");

exports.seed = function(knex) {
  return knex
      .raw("TRUNCATE TABLE genres RESTART IDENTITY CASCADE")
      .then(function() {
        return knex("genres").insert([
          { genre_name: "autobiography" },
          { genre_name: "drama" },
          { genre_name: "classic" },
          { genre_name: "history" },
          { genre_name: "fantasy" },
          { genre_name: "anthology" },
          { genre_name: "romance" },
        ]);
      });
};
