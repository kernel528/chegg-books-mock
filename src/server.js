const { PORT = 5001 } = process.env;
const app = require("./app");
const knex = require("./db/connection");

const listener = () => console.log(`Listening on Port http://localhost:${PORT}!`);
app.listen(PORT, listener);