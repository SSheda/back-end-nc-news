const db = require (`../db/index`)

exports.selectAllAccounts = () => {
    return db.query(`SELECT * FROM accounts;`)
        .then(({rows}) => {
            return rows;
        });
}