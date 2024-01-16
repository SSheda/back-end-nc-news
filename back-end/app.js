var express = require('express')
const { getAllAccounts } = require('./controllers/accountController')
var app = express()

app.get('/account', getAllAccounts)
app.listen(4000, ()=>{
    console.log('Server listening on port 4000')
})
