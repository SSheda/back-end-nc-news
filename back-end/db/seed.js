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
            return db.query(`INSERT INTO account
                            (username, password, email)
                            VALUES 
                            ('yuliia', 433416, 'juliayakubiv@gmail.com'),
                            ('admin', 111111, 'test@gmail.com')
                            RETURNING*;`)
        }).then((data) => {
            console.log(data.rows)
        })
}

seed();