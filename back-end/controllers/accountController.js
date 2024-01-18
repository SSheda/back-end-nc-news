const { createNewUser, logInUser } = require("../models/accountModels");
const bcrypt = require('bcrypt');
const { validateEmail, validatePassword } = require("../utils/dataValidation");

exports.postSignUp = (req, res, next) => {
  const userDetails = req.body
  if (!userDetails.username || !userDetails.password || !userDetails.email){
    res.status(400).send({ msg: "Bad request" });
  }
  else if (validateEmail(userDetails.email)===false || validatePassword(userDetails.password)===false){
    res.status(400).send({ msg: "Bad request" });
  }
  
  createNewUser(userDetails)
      .then((newUser)=>{
        res.status(201).send({ newUser });
      })
      .catch(next);
}

exports.postLogIn = (req, res, next) => {
  const userDetails = req.body

  logInUser(userDetails)
  .then((user)=>{
    res.status(201).send({ user });
  })
  .catch(next);  
}