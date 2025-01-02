/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("books_genres", (table) => {
        table.integer("book_id").unsigned().notNullable();
        table
            .foreign("book_id")
            .references("book_id")
            .inTable("books")
            .onDelete("CASCADE");
        table.integer("genre_id").unsigned().notNullable();
        table
            .foreign("genre_id")
            .references("genre_id")
            .inTable("genres")
            .onDelete("CASCADE");

        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("books_genres");
};
