const db = require("../db/index")

exports.selectAllTopics = (req, res, next) => {   
    return db.query(`SELECT * FROM topics`)
    .then((result) => {
      return result.rows;
    });
  };