/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const products = require('../../data/products')
const characteristicScores = require('../../data/characteristicScores')

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('products').del()
  await knex('characteristics').del()
  await knex('product_characteristics').del()

  try {
    const products_no_characteristics = products.map(({name}) => ({ name }));
    const productsTable = await knex('products').insert(products_no_characteristics).returning(['id', 'name'])
    const characteristicsTable = await knex('characteristics').insert(characteristicScores).returning(['id', 'name'])

    // create the product_characteristics junction_table
    const product_characteristics = []
    products.forEach(({name, characteristics}) => {

      // get the product entry from the product table
      const product_entry = productsTable.find(p => p.name === name)

      characteristics.forEach(characteristic => {

        // get the characteristic entry from the characteristics table
        const characteristic_entry = characteristicsTable.find(c => c.name === characteristic)

        // put their ids in the product_characteristics table
        product_characteristics.push({
          product_id: product_entry.id,
          characteristic_id: characteristic_entry.id
        })
      })
    })

    // insert it into the database
    await knex('product_characteristics').insert(product_characteristics)

  }
  catch (error) {
    console.log("Seed error: ", error)
  }
};
