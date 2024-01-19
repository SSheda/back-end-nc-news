const { selectAllArticles, selectArticleById, selectArticleByAuthor } = require("../models/articlesModel");

exports.getAllArticles = (req, res, next) => {
    const query = req.query
    
    selectAllArticles(query)
    .then((article) => {
        res.status(200).send({ article });
      })
      .catch(next);
}

exports.getArticleById = (req, res, next) => {
    const articleId = req.params.article_id;
    selectArticleById(articleId)
    .then((article) => {
        res.status(200).send({ article });
      })
      .catch(next);
}

