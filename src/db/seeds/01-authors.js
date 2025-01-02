/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// const authors = require("../fixtures/authors");

exports.seed = function(knex) {
  return knex
      .raw("TRUNCATE TABLE authors RESTART IDENTITY CASCADE")
      .then(function() {
        return knex("authors").insert([
          { author_name: "Ba Jin", nationality: "China" },
          { author_name: "Jane Austen", nationality: "United Kingdom" },
          { author_name: "Toni Morrison", nationality: "United States of America" },
          { author_name: "Gabriel García Márquez", nationality: "Colombia" },
          { author_name: "Elif Shafak", nationality: "Turkey" },
          { author_name: "Amy Tan", nationality: "United States of America" },
          { author_name: "Leo Tolstoy", nationality: "Russia" },
        ]);
      });
};
