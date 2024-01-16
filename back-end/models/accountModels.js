const db = require (`../db/index`)

exports.selectAllAccounts = () => {
    console.log("hello")
    return db.query(`SELECT * FROM account;`)
        .then(({rows}) => {
            return rows;
        });
}