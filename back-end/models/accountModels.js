const db = require(`../db/index`)
const bcrypt = require('bcrypt');


exports.createNewUser = (userDetails) => {
    return bcrypt.genSalt()
        .then((salt) => {
            return bcrypt.hash(userDetails.password, salt)
                .then((hashedPassword) => {
                    userDetails.password = hashedPassword
                    return db.query(`INSERT INTO accounts
                    (username, password, email)
                    VALUES
                    ($1, $2, $3)
                    RETURNING*;`,
                        [userDetails.username, userDetails.password, userDetails.email])
                        .then(({ rows }) => {
                            return rows[0]
                        })
                        .catch((error) => {
                            throw error;
                        });
                })
        })
}

exports.logInUser = (userDetails) => {
    return db.query(`SELECT * FROM accounts
                    WHERE email = $1;`,
        [userDetails.email])
        .then(({ rows }) => {  
            if (rows.length===0){
                throw { status: 404, msg: "User not registered" };
            }          
            return bcrypt.compare(userDetails.password, rows[0].password)
                .then((result) => {
                    if (result === true) {
                        return rows[0]
                    }
                    else {
                        throw { status: 401, msg: "Username/Password not valid" };
                    }
                })
                .catch((error) => {
                    throw error;
                });
        });
}

