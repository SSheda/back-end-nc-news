const { selectAllAccounts } = require("../models/accountModels")

exports.getAllAccounts = (req, res, next) => {
    selectAllAccounts()
    .then((accounts) => {
        res.status(200).send({ accounts });
      })
      .catch(next);
}