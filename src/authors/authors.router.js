const router = require("express").Router({ mergeParams: true });
const authorsController = require("./authors.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/")
    .get(authorsController.list)
    .post(authorsController.create)
    .all(methodNotAllowed);

router
    .route("/:authorId")
    .get(authorsController.read)
    .put(authorsController.update)
    .delete(authorsController.deleteAuthor)
    .all(methodNotAllowed);


module.exports = router;