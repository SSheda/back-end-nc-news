const path = require('path');
const { Pool} = require('pg');

const config = {};

const ENV = process.env.NODE_ENV || 'development' || 'test' || 'production';
console.log(ENV)
require('dotenv').config({
    path: path.join(__dirname, `${ENV}.env`)
});
if (ENV === 'production') {
    config.connectionString = process.env.DATABASE_URL;
    config.max = 2;
  }
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
})

if (!process.env.DATABASE && !process.env.DATABASE_URL) {
    throw new Error('PGDATABASE or DATABASE_URL not set');
  }
module.exports = pool;