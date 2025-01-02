const router = require("express").Router({ mergeParams: true });
const booksController = require("./books.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/")
    .get(booksController.list)
    .post(booksController.create)
    .all(methodNotAllowed);

router
    .route("/:bookId")
    .get(booksController.read)
    .put(booksController.update)
    .delete(booksController.deleteBook)
    .all(methodNotAllowed);

module.exports = router;