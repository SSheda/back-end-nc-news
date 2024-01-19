const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

const ENV = process.env.NODE_ENV || 'development';

console.log(ENV);

dotenv.config({
    path: path.join(__dirname, `${ENV}.env`)
});

const config = {};
const poolConfig = {};

if (ENV === 'production') {
    poolConfig.connectionString = process.env.DATABASE_URL;
    poolConfig.max = 2;
} else {
    poolConfig.user = process.env.USER;
    poolConfig.host = process.env.HOST;
    poolConfig.database = process.env.DATABASE;
    poolConfig.password = process.env.PASSWORD;
    poolConfig.port = process.env.PORT;
}

const pool = new Pool(poolConfig);

if (!(process.env.DATABASE || process.env.DATABASE_URL)) {
    throw new Error('PGDATABASE or DATABASE_URL not set');
}

module.exports = pool;
