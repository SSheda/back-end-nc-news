const db = require("./index.js");
const format = require('pg-format');
//const data = require("../db/test-data/index.js")

async function seed(data) {
    return db.query(`DROP TABLE IF EXISTS accounts;`)
        .then(() => {
            return db.query(`CREATE TABLE accounts (
                                user_id serial PRIMARY KEY,
                                username VARCHAR ( 500 ) UNIQUE NOT NULL,
                                password VARCHAR ( 500 ) NOT NULL,
                                email VARCHAR ( 500 ) UNIQUE NOT NULL,
                                avatar_url VARCHAR
                         );`)
        }).then(() => {
            return db.query(format(`INSERT INTO accounts
                            (username, password, email, avatar_url)
                            VALUES 
                            %L
                            RETURNING*;`,
                            data.accountData.map(({username, password, email, avatar_url})=> [username, password, email, avatar_url])))
        }).then(() => {})
}
module.exports = seed;
//seed(data)
