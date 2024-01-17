const db = require (`../db/index`)

exports.createNewUser = (userDetails) => {
    return db.query(`INSERT INTO accounts
                    (username, password, email)
                    VALUES
                    ($1, $2, $3)
                    RETURNING*;`,
                    [userDetails.username, userDetails.password, userDetails.email])
        .then(({rows}) => {
            return rows[0]
        });
}