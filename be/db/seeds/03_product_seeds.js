/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const products = require('../../data/products')
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // Deletes ALL existing entries
  await knex('products').del()

  try {
    await knex('products').insert(products).returning('*')
  }
  catch (error) {
    console.log("Seed error: ", error)
    throw error
  }
};
