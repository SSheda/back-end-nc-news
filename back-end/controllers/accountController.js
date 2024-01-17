const { selectAllAccounts, authorization } = require("../models/accountModels")

exports.getAllAccounts = (req, res, next) => {
  selectAllAccounts()
    .then((accounts) => {
      res.status(200).send({ accounts });
    })
    .catch(next);
}
exports.getAccess = (req, res, next) => {
  const logDetails = req.body
  authorization(logDetails)
    .then((access) => {
      res.status(200).send({ access });
    })
    .catch(next);
}