const { createNewUser, logInUser } = require("../models/accountModels");
const { validateEmail, validatePassword } = require("../utils/dataValidation");

exports.postSignUp = (req, res, next) => {
  const userDetails = req.body
  if (!userDetails.username || !userDetails.password || !userDetails.email){
    return res.status(400).send({ msg: "Bad request" });
  }
  else if (validateEmail(userDetails.email)===false || validatePassword(userDetails.password)===false){
    return res.status(422).send({ msg: "Contains invalid data" });
  }  
  createNewUser(userDetails)
      .then((newUser)=>{
        res.status(201).send({ newUser });
      })
      .catch(next);
}


exports.postLogIn = (req, res, next) => {
  const userDetails = req.body 
  if (!userDetails.password || !userDetails.email){
    return res.status(400).send({ msg: "Invalid Email/Password" });
  }
  else if (validateEmail(userDetails.email)===false || validatePassword(userDetails.password)===false){
    return res.status(400).send({ msg: "Invalid Email/Password" });
  } 
  logInUser(userDetails)
  .then((user)=>{
    res.status(201).send({ user });
  })
  .catch(next);  
}