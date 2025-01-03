// Description: Controller for authors.
const path = require("path");
const authorsService = require("./authors.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const booksService = require("../books/books.service");

/**
 * @type {{}}
 */

/*  *** GET:list *** */
async function listAuthors(req, res) {
    const authorData = await authorsService.listAuthors();
    res.json({ authorData });
}

/* *** GET:read *** */
async function readAuthors(req, res) {
    const { authorId } = req.params;
    const foundAuthor = await authorsService.readAuthors(authorId);
    // TODO:  Add logic to check if author exists, similar to bookExists middleware
    res.json({ foundAuthor });
}


module.exports = {
    list: asyncErrorBoundary(listAuthors),
    read: asyncErrorBoundary(readAuthors),
};