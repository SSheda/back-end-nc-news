const express = require('express')
const cors = require('cors');
const { postSignUp, postLogIn } = require('./controllers/accountController');
const { handlePsqlErrors, handleServerError, handleCustomerErrors, handleBadRequestError } = require('./errors/errors');
const { getAllEndpoints } = require('./controllers/endpointsController');
const { getAllTopics } = require('./controllers/topicsController');

const app = express()

app.use(express.json());
app.use(cors());

app.get("/api", getAllEndpoints)
app.post  ('/api/signup', postSignUp)    
app.post  ('/api/login', postLogIn)    
app.get("/api/topics", getAllTopics);

app.all('*', (req, res) => {
  res.status(404).send({ msg: "Path not found" });
});

app.use(handlePsqlErrors)
app.use(handleBadRequestError)
app.use(handleServerError)
app.use(handleCustomerErrors)

module.exports = app;