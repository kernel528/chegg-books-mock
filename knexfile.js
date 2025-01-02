// Update with your config settings.
const path = require("path");
require("dotenv").config();

const {
  NODE_ENV = "development",
  DEVELOPMENT_DATABASE_URL,
  PRODUCTION_DATABASE_URL,
} = process.env;
const URL =
    NODE_ENV === "production"
        ? PRODUCTION_DATABASE_URL
        : DEVELOPMENT_DATABASE_URL;

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  production: {
    client: "pg",
    connection: URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

};
