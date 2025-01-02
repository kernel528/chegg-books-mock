/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("genres", (table) => {
    table.increments("genre_id").primary();
    table.string("genre_name").notNullable();
    table.timestamps(true, true); // Adds the created_at and updated_at columns
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("genres");
};
