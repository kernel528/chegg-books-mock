/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("books", (table) => {
        table.increments("book_id").primary();
        table.string("book_title").notNullable();
        table.integer("author_id").unsigned().notNullable();
        table
            .foreign("author_id")
            .references("author_id")
            .inTable("authors")
            .onDelete("CASCADE");
        table.integer("genre_id").unsigned().notNullable();
        table
            .foreign("genre_id")
            .references("genre_id")
            .inTable("genres")
            .onDelete("CASCADE");
        table.integer("price").notNullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("books");
};
