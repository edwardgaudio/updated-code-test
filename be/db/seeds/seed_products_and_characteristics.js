const products = require('../../data/products'); // Assuming products data is stored in a data folder

// Define the characteristic scores (Should probably move this into a config file)
const characteristicScores = {
  'Plastic-Free': 2,
  'Locally Produced': 1,
  'Humane': 1,
  'Vegan': 1,
  'Healthy': 1,
  'Wasteful': -1,
  'Unhealthy': -1
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Clear existing data
  await knex('products_to_characteristics').del();
  await knex('characteristics').del();
  await knex('products').del();

  // Insert characteristics into the 'characteristics' table
  const characteristicIds = {};
  for (let [name, score] of Object.entries(characteristicScores)) {
    let [{id}] = await knex('characteristics').insert({ name, score }).returning('id');
    characteristicIds[name] = id;
  }

  // Insert products and their characteristics into 'products_to_characteristics'
  for (let product of products) {
    let [{id}] = await knex('products').insert({ name: product.name }).returning('id');

    for (const characteristic of product.characteristics) {
      const characteristicId = characteristicIds[characteristic]; // Get the characteristic ID
      await knex('products_to_characteristics').insert({
        product_id: id,
        characteristic_id: characteristicId
      });
    }
  }
};
