const knex = require("../db/connection");

function listBooks() {
  return knex("books").select("*");
}

function countBooks() {
    return knex("books").count("book_id");
}

// List out of stock books
function listOutOfStockBooks() {
    return knex("books").where({ in_stock: false }).select("*");
}

// List in-stock books
function listInStockBooks() {
    return knex("books").where({ in_stock: true }).select("*");
}

// Count of in-stock books using async and await.
async function countInStockBooks() {
    const [{ count }] = await knex("books").where({ in_stock: true }).count("book_id");
    return count;
}

// Count of out of stock books
function countOutOfStockBooks() {
    return knex("books").where({ in_stock: false }).count("book_id");
}

// function readBooks() {
//     return knex("books").select("*");
// }

module.exports = {
    listBooks,
    countBooks,
    listInStockBooks,
    countInStockBooks,
    listOutOfStockBooks,
    countOutOfStockBooks,
};