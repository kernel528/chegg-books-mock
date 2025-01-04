// Description: Controller for authors.
const path = require("path");
const authorsService = require("./authors.service");

const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("author_name", "nationality");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_PROPERTIES = [
    "author_name",
    "nationality",
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
/*  *** GET:list *** */
async function listAuthors(req, res) {
    const data = await authorsService.listAuthors();
    res.json({ data });
}

/* *** GET:read *** */
async function authorExists(req, res, next) {
    const { authorId } = req.params;
    const foundAuthor = await authorsService.readAuthor(authorId);
    if (foundAuthor) {
        res.locals.author = foundAuthor;
        return next();
    }
    next({ status: 404, message: `Author by author_id ${authorId} cannot be found.` });
}

function readAuthor(req, res) {
    const { author: data } = res.locals;
    res.json({ data });
}

/* *** POST:create *** */
async function createAuthor(req, res) {
    const newAuthor = await authorsService.createAuthor(req.body.data);
    res.status(201).json({ data: newAuthor });
}

/* ** PUT:update ** */
async function updateAuthor(req, res) {
    const { author } = res.locals;
    const updatedAuthor = {
        ...req.body.data,
        author_id: author.author_id,
    };
    const data = await authorsService.updateAuthor(updatedAuthor);
    res.json({ data });
}

/* ** DELETE:destroy ** */
async function deleteAuthor(req, res, next) {
    const { author } = res.locals;
    const deleted = await authorsService.deleteAuthor(author.author_id);

    if (deleted) {
        res.sendStatus(204);
    } else {
        next({ status: 404, message: `Author with ID ${author.author_id} not found.` });
    }
}

module.exports = {
    list: asyncErrorBoundary(listAuthors),
    read: [
        asyncErrorBoundary(authorExists),
        asyncErrorBoundary(readAuthor),
    ],
    create: [
        hasOnlyValidProperties,
        hasRequiredProperties,
        asyncErrorBoundary(createAuthor),
    ],
    update: [
        asyncErrorBoundary(authorExists),
        hasOnlyValidProperties,
        hasRequiredProperties,
        asyncErrorBoundary(updateAuthor),
    ],
    deleteAuthor: [
        asyncErrorBoundary(authorExists),
        asyncErrorBoundary(deleteAuthor),
    ],
};