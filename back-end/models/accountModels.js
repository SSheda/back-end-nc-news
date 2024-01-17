const db = require (`../db/index`)

exports.selectAllAccounts = () => {
    return db.query(`SELECT * FROM accounts;`)
        .then(({rows}) => {
            return rows;
        });
}
exports.authorization = (logDetails) => {
    return db.query(`SELECT * FROM accounts;`)
        .then(({rows}) => {
            let user = rows.find((el)=>{
                return el.username === logDetails.username
            })
            console.log(user)
            return rows;
        });
}