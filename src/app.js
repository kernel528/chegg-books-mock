const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const errorHandler = require("./errors/errorHandler");
const methodNotAllowed = require("./errors/methodNotAllowed");
const booksRouter = require("./books/books.router");
const authorsRouter = require("./authors/authors.router");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Add routes here
app.get("/", (req, res) => {
  res.send("Hello!  Welcome to the Books and Authors API Query Service!");
});
app.use("/books", booksRouter);
app.use("/authors", authorsRouter);

// Add method not allowed handler here
app.use(methodNotAllowed);

// Add error handler here
// app.use(errorHandler);
// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});


module.exports = app;