/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('characteristics', table => {
        table.increments('id').primary(); // Auto-increment primary key
        table.string('name').notNullable(); // Characteristic name
        table.integer('score').notNullable(); // Characteristic score
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('characteristics');
};
