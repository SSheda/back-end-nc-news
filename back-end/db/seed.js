const db = require("./index.js");
const format = require('pg-format');

async function seed(data) {
    return db.query(`DROP TABLE IF EXISTS accounts;`)
        .then(() => {
            return db.query(`DROP TABLE IF EXISTS topics;`);
        })
        .then(() => {
            return db.query(`DROP TABLE IF EXISTS articles;`);
          })
        .then(() => {
            return db.query(`CREATE TABLE topics (
                            slug VARCHAR PRIMARY KEY,
                            description VARCHAR
                            );`);
        })
        .then(() => {
            return db.query(`CREATE TABLE accounts (
                                user_id serial PRIMARY KEY,
                                username VARCHAR UNIQUE NOT NULL,
                                password VARCHAR NOT NULL,
                                email VARCHAR UNIQUE NOT NULL,
                                avatar_url VARCHAR
                         );`)
        }).then(() => {
            return db.query(format(`INSERT INTO accounts
                            (username, password, email, avatar_url)
                            VALUES 
                            %L
                            RETURNING*;`,
                data.accountData.map(({ username, password, email, avatar_url }) => [username, password, email, avatar_url])))
        }).then(() => {
            return db.query(format(`INSERT INTO topics 
                                   (slug, description) 
                                    VALUES %L;`,
                data.topicsData.map(({ slug, description }) => [slug, description])))
        })
}
module.exports = seed;
