const { createNewUser } = require("../models/accountModels");
const bcrypt = require('bcrypt');

exports.postSignUp = (req, res, next) => {
  const userDetails = req.body
  bcrypt.genSalt()
  .then((salt)=>{
    return  bcrypt.hash(userDetails.password, salt)
    .then((hashedPassword)=>{
      userDetails.password = hashedPassword
      return createNewUser(userDetails)
      .then((newUser)=>{
        console.log(newUser)
        res.status(201).send({ newUser });
      })
      .catch(next);
    })
  })
}