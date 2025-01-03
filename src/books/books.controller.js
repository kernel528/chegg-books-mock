// Description: Controller for books
const path = require("path");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("book_title", "author_id", "genre_id");

// const books = require("../data/books-data.js");
// const nextId = require("../utils/nextId");
const booksService = require("./books.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * @type {{}}
 */

const VALID_PROPERTIES = [
    "book_title",
    "author_id",
    "publication_year",
    "genre_id",
    "price",
    "in_stock",
];

function hasOnlyValidProperties(req, res, next) {
    const { data = {} } = req.body;

    const invalidFields = Object.keys(data).filter(
        (field) => !VALID_PROPERTIES.includes(field)
    );

    if (invalidFields.length) {
        return next({
            status: 400,
            message: `Invalid field(s): ${invalidFields.join(", ")}`,
        });
    }
    next();
}

/* *** GET:list *** */ // Post-refactor with knex service + async/await
async function listBooks(req, res) {
    const data = await booksService.listBooks();
    res.json({ data });
}

// Create new book object --> Post-refactor with knex service
async function createBooks(req, res) {
    const data = await booksService.createBooks(req.body.data);
    res.status(201).json({ data });
}


// Middleware to find a book by book_id --> Post-refactor with knex service
async function bookExists(req, res, next) {
    const { bookId } = req.params;
    const foundBook = await booksService.readBooks(bookId);
    if (foundBook) {
        res.locals.book = foundBook;
        return next();
    }
    next({ status: 404, message: `Book with ID ${bookId} not found.` });
}

// GET /books/:bookId --> Post-refactor with knex service
function read(req, res) {
    const { book: data } = res.locals;
    res.json({ data });
}

/*   *** Update ***   */
// /books/:bookId PUT
function updateBook(req, res ) {
    const foundBook = res.locals.book;
    const { data: { title, author_name, publication_year, genre, in_stock } = {} } = req.body;

    // TODO: Add check for field types and values exist, etc..., Example:  GrubDash src/dishes/dishes.controller.js

    // Update the book object with the new data
    foundBook.title = title;
    foundBook.author_name = author_name;
    foundBook.publication_year = publication_year;
    foundBook.genre = genre;
    foundBook.in_stock = in_stock;

    res.json({ data: foundBook });
}

/*   *** Delete ***   */
// /books/:bookId DELETE --> Pre-refactor with knex service
// function deleteBook(req, res) {
//     const { bookId } = req.params;
//     const index = books.findIndex((book) => book.book_id === bookId);
//     if (index > -1) {
//         books.splice(index, 1);
//     }
//     res.sendStatus(204);
// }

// /books/:bookId DELETE --> Post-refactor with knex service
// First attempt
// function deleteBook(req, res) {
//     const { book } = res.locals;
//     booksService.deleteBook(book.book_id);
//     res.sendStatus(204);
// }
// Second attempt
async function deleteBook(req, res, next) {
    const { book } = res.locals;
    // await booksService.deleteBook(book.book_id);  --> These worked but decided to add deleted to check delete status before responding.
    // res.sendStatus(204);
    const deleted = await booksService.deleteBook(book.book_id);

    if (deleted) {
        res.sendStatus(204);
    } else {
        next({ status: 404, message: `Book with ID ${book.book_id} not found.` });
    }
}

// Practice setting up aggregate functions with async and await style.
async function countBooks(req, res) {
    res.json({ data: await booksService.countBooks() });
}

async function listOutOfStockBooks(req, res) {
    res.json({ data: await booksService.listOutOfStockBooks() });
}

async function listInStockBooks(req, res) {
    res.json({ data: await booksService.listInStockBooks() });
}

async function countInStockBooks(req, res) {
    res.json({ data: await booksService.countInStockBooks() });
}

async function countOutOfStockBooks(req, res) {
    res.json({ data: await booksService.countOutOfStockBooks() });
}

module.exports = {
    list: asyncErrorBoundary(listBooks),
    read: [bookExists, read],
    // create: [validateBookData, create],
    create: [
        hasOnlyValidProperties,
        hasRequiredProperties,
        asyncErrorBoundary(createBooks),
    ],
    // update: [bookExists, validateBookData, updateBook],
    // deleteBook: [bookExists, deleteBook],
    deleteBook: [asyncErrorBoundary(bookExists), asyncErrorBoundary(deleteBook)],
    readBooks: [bookExists, asyncErrorBoundary(booksService.readBooks)],
    countBooks: asyncErrorBoundary(countBooks),
    listOutOfStockBooks: asyncErrorBoundary(listOutOfStockBooks),
    listInStockBooks: asyncErrorBoundary(listInStockBooks),
    countInStockBooks: asyncErrorBoundary(countInStockBooks),
    countOutOfStockBooks: asyncErrorBoundary(countOutOfStockBooks),
}