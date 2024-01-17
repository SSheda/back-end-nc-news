const express = require('express')
const { postSignUp } = require('./controllers/accountController')

const app = express()

app.use(express.json());
//app.use(cors());

//app.get   ('/signup', (req, res))      //sign up page
//app.get   ('/login', (req, res))       //log in page
app.post  ('/api/signup', postSignUp)      //create a new user in db
//app.post  ('/login', (req, res))       // authenticate a current user
//app.get   ('/logout', (req, res))      //log a user out
module.exports = app;