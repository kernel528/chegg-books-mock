const knex = require("../db/connection");

// List all authors...
function listAuthors() {
  return knex("authors").select("*");
}

// Get author by author_id...
function readAuthor(author_id) {
    return knex("authors as a")
      .select("a.*")
      .where({ "a.author_id": author_id })
      .first();
}

// Create author...
function createAuthor(newAuthor) {
    return knex("authors as a")
        .insert(newAuthor)
        .returning("a.*")
        .then((createdRecords) => createdRecords[0]);
}

// Update an author...

// Delete an author...
function deleteAuthor(author_id) {
    return knex("authors").where({ author_id }).del();
}

module.exports = {
    listAuthors,
    readAuthor,
    createAuthor,
    deleteAuthor,
}