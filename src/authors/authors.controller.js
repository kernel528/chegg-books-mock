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

module.exports = {
    list: asyncErrorBoundary(listAuthors),
    read: [
        asyncErrorBoundary(authorExists),
        asyncErrorBoundary(readAuthor),
    ],
    // create: asyncErrorBoundary(createAuthor),
    create: [
        hasOnlyValidProperties,
        hasRequiredProperties,
        asyncErrorBoundary(createAuthor),
    ]
};