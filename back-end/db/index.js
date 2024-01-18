const path = require('path');

const { Pool} = require('pg');

const ENV = process.env.NODE_ENV || 'development' || 'test';

require('dotenv').config({
    path: path.join(__dirname, `${ENV}.env`)
});
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
})
if (!process.env.DATABASE) {
    throw new Error('PGDATABASE not set');
  }
module.exports = pool;