/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('health_check').del()
  await knex('health_check').insert([
    {status: 'healthy'},
    {status: 'not healthy'},
  ]);
};
