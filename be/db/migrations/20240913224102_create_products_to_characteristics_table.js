/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('products_to_characteristics', table => {
        table.increments('id').primary(); // Auto-increment primary key
        table.integer('product_id').unsigned().notNullable(); // Foreign key to products
        table.integer('characteristic_id').unsigned().notNullable(); // Foreign key to characteristics

        // Define foreign key relationships
        table.foreign('product_id').references('id').inTable('products').onDelete('CASCADE');
        table.foreign('characteristic_id').references('id').inTable('characteristics').onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('products_to_characteristics');
};
