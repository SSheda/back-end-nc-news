const db = require("./index.js");

async function seed() {
    return db.query(`DROP TABLE IF EXISTS account;`)
        .then(() => {
            return db.query(`CREATE TABLE account (
                                user_id serial PRIMARY KEY,
                                username VARCHAR ( 50 ) UNIQUE NOT NULL,
                                password VARCHAR ( 50 ) NOT NULL,
                                email VARCHAR ( 255 ) UNIQUE NOT NULL
                         );`)
        }).then(() => {
            console.log("done")
        }).then(() => {
            console.log("done")
        })
}

seed();