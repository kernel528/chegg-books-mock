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

// Get Book by ID
function readBooks(book_id) {
    return knex("books as b")
        .select("b.*")
        .where({ "b.book_id": book_id })
        .first();
}
// Get Book by Title - TBD

function createBooks(newBook) {
    return knex("books")
        .insert(newBook)
        .returning("*")
        .then((createdRecords) => createdRecords[0]);
}

function deleteBook(book_id) {
    return knex("books").where({ book_id }).del();
}

module.exports = {
    listBooks,
    readBooks,
    countBooks,
    listInStockBooks,
    countInStockBooks,
    listOutOfStockBooks,
    countOutOfStockBooks,
    createBooks,
    deleteBook,
};