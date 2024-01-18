const express = require('express')
const { postSignUp, postLogIn } = require('./controllers/accountController');
const { handlePsqlErrors } = require('./errors/errors');

const app = express()

app.use(express.json());

app.get('/api', (req, res) => {
    res.send('hello world');
  })
app.post  ('/api/signup', postSignUp)    
app.post  ('/api/login', postLogIn)    

app.use (handlePsqlErrors)

module.exports = app;