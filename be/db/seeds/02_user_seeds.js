const bcrypt = require('bcrypt');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('users').del();

  const password1 = await bcrypt.hash('password1', 10);
  const password2 = await bcrypt.hash('password1', 10);

  await knex('users').insert([
    {username: 'edwardgaudio', password: password1},
    {username: 'youruser', password: password2},
  ]);
};
