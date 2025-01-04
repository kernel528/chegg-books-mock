// Description: Router for books.
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

// Practice aggregates with books router
router.route("/total-books").get(booksController.countBooks).all(methodNotAllowed);
router.route("/in-stock").get(booksController.listInStockBooks).all(methodNotAllowed);
router.route("/in-stock-count").get(booksController.countInStockBooks).all(methodNotAllowed);
router.route("/out-of-stock").get(booksController.listOutOfStockBooks).all(methodNotAllowed);
router.route("/out-of-stock-count").get(booksController.countOutOfStockBooks).all(methodNotAllowed);

module.exports = router;