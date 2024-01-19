const db = require("../db/index")

exports.selectAllComments = (query) => {
    if(Object.keys(query).length>0){
        const queryKey = Object.keys(query).join("")
        const queryParams = query[queryKey];
        return db.query(`SELECT * FROM comments 
                        WHERE ${queryKey} = $1
                        ORDER BY created_at DESC;`, [queryParams])
        .then((result) => {
            if (result.rows.length === 0 ) {
                return Promise.reject({ status: 404, msg: 'Path not found' })
            }
            return result.rows;
        });
    }
    return db.query(`SELECT * FROM comments
                     ORDER BY created_at DESC;`)
        .then((result) => {
            return result.rows;
        });
}

exports.selectCommentById = (commentId) => {
    return db.query(`SELECT * FROM comments WHERE comment_id = $1;`, [commentId])
        .then((result) => {
            if (result.rows.length === 0) {
                return Promise.reject({ status: 404, msg: 'Path not found' })
            }
            return result.rows[0];
        });
}

exports.selectCommentsByArticleId = (articleId) => {

    return db.query(`SELECT * FROM comments
                     WHERE article_id = $1
                     ORDER BY created_at DESC;`, [articleId])
        .then(({ rows }) => {
            return rows;
        });
}

exports.insertComment = (articleId, newComment) => {
    const { body, username } = newComment;
    let queryString = "INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) RETURNING *;"
    const queryValues = [body, username, articleId]
    if (!newComment.body || !newComment.username || Object.keys(newComment).length > 2) {
        return Promise.reject({ status: 400, msg: "Bad Request" })
    }
    else {
        return db.query(queryString, queryValues)
            .then(({ rows }) => {
                return rows[0];
            })
    }
}

exports.changeArticleById = (articleId, newVotes) => {
    if (!newVotes.inc_votes ) {
        return Promise.reject({ status: 400, msg: "Bad request" })
    }
    else {
        return db.query(`UPDATE articles SET likes = likes + $1 WHERE article_id = $2 RETURNING *;`, [newVotes.inc_votes, articleId])
            .then((result) => {
                if (result.rows.length === 0) {
                    return Promise.reject({ status: 404, msg: 'Path not found' })
                }
                return result.rows[0];
            });
    }
}

exports.deleteSingleComment = (comment_id) => {
    return db.query(`DELETE FROM comments
                     WHERE comment_id = $1
                     RETURNING *;`, [comment_id])
        .then(({rows}) => {
            if (!rows.length) {
                return Promise.reject({ status: 404, msg: "Path not found" });
            }
            return rows;
        });
}