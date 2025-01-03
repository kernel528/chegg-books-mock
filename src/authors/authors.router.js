const router = require("express").Router({ mergeParams: true });
const authorsController = require("./authors.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(authorsController.list).all(methodNotAllowed);


module.exports = router;