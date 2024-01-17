const express = require('express')
const { getAllAccounts, getAccess } = require('./controllers/accountController')

const app = express()

app.use(express.json());
//app.use(cors());

app.get('/api/account', getAllAccounts)
app.post('/api/log-in', getAccess)

module.exports = app;