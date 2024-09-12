/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {

    await knex.schema.renameTable('products', 'products_old')

    await knex.schema.createTable('products', table => {
        table.increments('id')
        table.string('name').notNullable()
    })

    await knex.schema.createTable('characteristics', table => {
        table.increments('id')
        table.string('name').notNullable().unique()
        table.integer('score').notNullable()
    })

    await knex.schema.createTable('product_characteristics', table => {
        table.increments('id')
        table.integer('product_id').unsigned().notNullable()
        table.integer('characteristic_id').unsigned().notNullable()
        table.foreign('product_id').references('products.id').onDelete('CASCADE')
        table.foreign('characteristic_id').references('characteristics.id').onDelete('CASCADE')
        table.unique(['product_id', 'characteristic_id'])
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable('products')
    await knex.schema.dropTable('characteristics')
    await knex.schema.dropTable('product_characteristics')
    await knex.schema.renameTable('products_old', 'products')
};
