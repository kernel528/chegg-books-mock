const path = require("path");

const authors = require("../data/authors-data");
// const nextId = require("../utils/nextId");
// const authorsService = require("./authors.service");
// const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/*  *** GET:list *** */ // Pre-refactor with knex service
function list(req, res) {
    res.json({ data: authors }); // Pre-refactor with knex service
}

module.exports = {
    list,
};