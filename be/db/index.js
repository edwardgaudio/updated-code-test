require('dotenv').config();
const knex = require('knex');

let db;

const createConnection = () => {
  db = knex({
    client: 'pg',
    // debug: true,
    connection: {
      user: process.env.DB_USER,
      password:  process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
    },
    pool: { min: 0, max: 10 },
  });
  return db;
};

const getDB = () => {
  if(db){
    return db;
  } else {
    return createConnection();
  }
}

module.exports = {
  createConnection,
  getDB,
}