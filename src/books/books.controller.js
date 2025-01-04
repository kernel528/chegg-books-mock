// Description: Controller for books
const path = require("path");
const booksService = require("./books.service");

const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("book_title", "author_id", "genre_id");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

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
function readBooks(req, res) {
    const { book: data } = res.locals;
    res.json({ data });
}

/*   *** Update ***   */
// /books/:bookId PUT --> Post-refactor with knex service, using async/await
async function updateBook(req, res) {
    const { book } = res.locals;
    const updatedBook = {
        ...req.body.data,
        book_id: book.book_id,
    };
    const data = await booksService.updateBook(updatedBook);
    res.json({ data });
}

/*   *** Delete ***   */
// /books/:bookId DELETE --> Post-refactor with knex service, using async/await
async function deleteBook(req, res, next) {
    const { book } = res.locals;
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
    read: [
        asyncErrorBoundary(bookExists),
        asyncErrorBoundary(readBooks),
    ],
    create: [
        hasOnlyValidProperties,
        hasRequiredProperties,
        asyncErrorBoundary(createBooks),
    ],
    update: [
        asyncErrorBoundary(bookExists),
        hasOnlyValidProperties,
        hasRequiredProperties,
        asyncErrorBoundary(updateBook)
    ],
    deleteBook: [
        asyncErrorBoundary(bookExists),
        asyncErrorBoundary(deleteBook)
    ],
    // Aggregates
    countBooks: asyncErrorBoundary(countBooks),
    listOutOfStockBooks: asyncErrorBoundary(listOutOfStockBooks),
    listInStockBooks: asyncErrorBoundary(listInStockBooks),
    countInStockBooks: asyncErrorBoundary(countInStockBooks),
    countOutOfStockBooks: asyncErrorBoundary(countOutOfStockBooks),
}