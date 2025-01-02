/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("genres", (table) => {
    table.increments("genre_id").primary();
    table.string("genre_name").notNullable();
    table.timestamps(true, true); // Adds the
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("genres");
};
