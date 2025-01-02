const path = require("path");
/**
 * @type {{}}
 */

// const books = require("../data/books-data.js");
const nextId = require("../utils/nextId");
const booksService = require("./books.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/*  *** GET:list *** */ // Pre-refactor with knex service
// function list(req, res) {
//     res.json({ data: books }); // Pre-refactor with knex service
// }

/* *** GET:list *** */ // Post-refactor with knex service
// function listBooks(req, res, next) {
//     booksService
//         .listBooks()
//         .then((data) => res.json({ data }))
//         .catch(next);
// }

/* *** GET:list *** */ // Post-refactor with knex service + async/await
async function listBooks(req, res) {
    const data = await booksService.listBooks();
    res.json({ data });
}

/*  *** POST:create *** */
// Create new book object
function create(req, res, next) {
    const { data: { title, author_name, publication_year, genre, in_stock } = {} } = req.body;
    const newBook = {
        book_id: nextId(),
        title,
        author_name,
        publication_year,
        genre,
        in_stock,
    };
    books.push(newBook); // Add the new book to the books array
    return res.status(201).json({ data: newBook });
}

// Middleware - Validate the data for creating a new book
function validateBookData(req, res, next) {
    const { data: { title, author_name, publication_year, genre, in_stock } = {} } = req.body;

    const missingFields = [];
    if (!title) missingFields.push("title");
    if (!author_name) missingFields.push("author_name");
    if (!publication_year) missingFields.push("publication_year");
    if (!genre) missingFields.push("genre");
    if (in_stock === undefined) missingFields.push("in_stock");

    if (missingFields.length) {
        return next({
            status: 400,
            message: `Missing required fields: ${missingFields.join(", ")}`,
        });
    }

    next();
}

/*   *** READ ***   */
// Middleware to find a book by book_id
function bookExists(req, res, next) {
    const { bookId } = req.params;
    const book = books.find((book) => book.book_id === bookId); // Match book_id as a string

    if (book) {
        res.locals.book = book; // Store the found book in res.locals
        return next(); // Proceed to the next middleware or route handler
    } else {
        next({ status: 404, message: `Book with ID ${bookId} not found.` });
    }
}

// GET /books/:bookId
function read(req, res) {
    const foundBook = res.locals.book;
    return res.json({ data: foundBook });
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
// /books/:bookId DELETE
function deleteBook(req, res) {
    const { bookId } = req.params;
    const index = books.findIndex((book) => book.book_id === bookId);
    if (index > -1) {
        books.splice(index, 1);
    }
    res.sendStatus(204);
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
    create: [validateBookData, create],
    update: [bookExists, validateBookData, updateBook],
    deleteBook: [bookExists, deleteBook],
    countBooks: asyncErrorBoundary(countBooks),
    listOutOfStockBooks: asyncErrorBoundary(listOutOfStockBooks),
    listInStockBooks: asyncErrorBoundary(listInStockBooks),
    countInStockBooks: asyncErrorBoundary(countInStockBooks),
    countOutOfStockBooks: asyncErrorBoundary(countOutOfStockBooks),
}