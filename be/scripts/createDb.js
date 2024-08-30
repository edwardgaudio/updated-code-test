require('dotenv').config({path: '../../.env'})

const connection = {
  user: process.env.DB_USER,
  password:  process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
}

console.log('connection:', connection)

const knex = require('knex')({ client: 'pg', connection });

knex.raw(`CREATE DATABASE ${process.env.DB_NAME}`)
  .then(function () {
    console.log(`db ${process.env.DB_NAME} created`);
    knex.destroy();
    process.exit()
  })
  .catch(e => console.log('Error, db probably already created', e));