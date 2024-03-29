const { selectAllEndpoints } = require("../models/endpointsModel");

exports.getAllEndpoints = (req, res, next) => {
    
    selectAllEndpoints()
      .then((endpoints) => {
        res.status(200).send({ endpoints });
      })
      .catch(next);
  };