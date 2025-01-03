const knex = require("../db/connection");

// List all authors...
function listAuthors() {
  return knex("authors").select("*");
}

// Get author by author_id...
function readAuthors(author_id) {
    return knex("authors as a")
      .select("a.*")
      .where({ "a.author_id": author_id })
      .first();
}

module.exports = {
    listAuthors,
    readAuthors,
}