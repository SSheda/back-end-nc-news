const { selectAllEndpoints } = require("../back-end/models/endpointsModel");

exports.getAllEndpoints = (req, res, next) => {
    
    selectAllEndpoints()
      .then((endpoints) => {
        res.status(200).send({ endpoints });
      })
      .catch(next);
  };