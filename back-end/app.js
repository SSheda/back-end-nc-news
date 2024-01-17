const express = require('express')
const { getAllAccounts } = require('./controllers/accountController')

const app = express()

//app.use(express.json());
//app.use(cors());

app.get('/api/account', getAllAccounts)


module.exports = app;