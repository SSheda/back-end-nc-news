const path = require('path');

const { Pool} = require('pg');

require('dotenv').config({
    path: path.join(__dirname, 'development.env')
});

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
})

async function asyncCall() {
    try {
        const { rows } = await pool.query('SELECT current_user');
        const currentUser = rows[0]['current_user']
        console.log(currentUser);
    } catch (err) {
        console.error(err);
    } 
};
asyncCall()

module.exports = pool;