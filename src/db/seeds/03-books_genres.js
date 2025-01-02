/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// const books_genres = require("../fixtures/books_genres");

exports.seed = async function(knex) {
  return knex
      .raw("TRUNCATE TABLE books_genres RESTART IDENTITY CASCADE")
      .then(function() {
        return knex("books_genres").insert([
          { book_id: 1, genre_id: 4 },
          { book_id: 42, genre_id: 1 },
          { book_id: 42, genre_id: 4 },
          { book_id: 43, genre_id: 1 },
          { book_id: 43, genre_id: 4 },
          { book_id: 44, genre_id: 1 },
          { book_id: 44, genre_id: 3 },
          { book_id: 44, genre_id: 4 },
        ]);
      });
};
