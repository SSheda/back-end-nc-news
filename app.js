const express = require('express')
const cors = require('cors');
const { postSignUp, postLogIn } = require('./controllers/accountController');
const { handlePsqlErrors, handleServerError, handleCustomerErrors, handleBadRequestError } = require('./errors/errors');
const { getAllEndpoints } = require('./controllers/endpointsController');
const { getAllTopics } = require('./controllers/topicsController');
const { getAllArticles, getArticleById } = require('./controllers/articlesController');
const { getAllComments, getCommentById, getCommentsByArticleId, postSingleComment, patchArticleById, deleteCommentById } = require('./controllers/commentsController');

const app = express()

app.use(express.json());
app.use(cors());

//app.get("/api", getAllEndpoints)
app.post('/api/signup', postSignUp)    
app.post('/api/login', postLogIn)  
//app.get("/api/topics", getAllTopics);
//app.get("/api/articles", getAllArticles);
//app.get("/api/articles/:article_id", getArticleById)
//app.patch("/api/articles/:article_id", patchArticleById) 
//app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
//app.post("/api/articles/:article_id/comments", postSingleComment)
//app.get("/api/comments", getAllComments)
//app.get("/api/comments/:comment_id", getCommentById)
//app.delete("/api/comments/:comment_id", deleteCommentById)

app.all('*', (req, res) => {
  res.status(404).send({ msg: "Path not found" });
});

app.use(handlePsqlErrors)
app.use(handleBadRequestError)
app.use(handleServerError)
app.use(handleCustomerErrors)

module.exports = app;