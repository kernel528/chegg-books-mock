const knex = require("../db/connection");

function listBooks() {
  return knex("books").select("*");
}

// function readBooks() {
//     return knex("books").select("*");
// }

module.exports = {
    listBooks,
};