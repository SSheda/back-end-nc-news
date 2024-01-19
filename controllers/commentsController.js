const { selectAllComments, selectCommentById, selectCommentsByArticleId, insertComment, changeArticleById, deleteSingleComment } = require("../back-end/models/commentsModel");
const { checkExists } = require("../back-end/utils/checkExists");

exports.getAllComments = (req, res, next) => {
    //console.log("controller")
    const query = req.query
    
    selectAllComments(query)
    .then((comments) => {
        res.status(200).send({ comments });
      })
      .catch(next);
}
exports.getCommentById = (req, res, next) => {
    const commentId = req.params.comment_id;
    selectCommentById(commentId)
    .then((comment) => {
        res.status(200).send({ comment });
      })
      .catch(next);
}

exports.getCommentsByArticleId = (req, res, next) => {
    const articleId = req.params.article_id;
    const commentsPromises = [selectCommentsByArticleId(articleId)]
    if (articleId) {
      commentsPromises.push(checkExists("articles", "article_id", articleId))
    }
    Promise.all(commentsPromises)
      .then((resolvedPromises) => {
        const comments = resolvedPromises[0]
        res.status(200).send({ comments });
      })
      .catch(next);
  }

  exports.postSingleComment = (req, res, next) => {
    const newComment = req.body;
    const {article_id} = req.params;
    const { username } = newComment;
 
    const commentsPromises = [checkExists("articles", "article_id", article_id), checkExists("accounts", "username", username), insertComment(article_id, newComment)]
  
       
    Promise.all(commentsPromises)
      .then((resolvedPromises) => {
        const comment = resolvedPromises[2]
        res.status(201).send({ comment });
      })
      .catch(next);
  }


  exports.patchArticleById = (req, res, next) => {
    const articleId = req.params.article_id;
    const newVotes = req.body;
  
    changeArticleById(articleId, newVotes)
      .then((article) => {
          res.status(200).send({ article });
        })
        .catch(next);
    
  }

  exports.deleteCommentById = (req, res, next) => {
    const {comment_id} =req.params
    deleteSingleComment(comment_id)
    .then(() => {
      res.status(204).send({});
    })
    .catch(next);
  }  