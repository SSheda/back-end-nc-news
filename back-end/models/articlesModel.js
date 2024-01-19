const db = require("../db/index")

exports.selectAllArticles = (query) => {
    if(Object.keys(query).length>0){
        const queryKey = Object.keys(query).join("")
        const queryParams = query[queryKey];
        return db.query(`SELECT * FROM articles 
                        WHERE ${queryKey} = $1
                        ORDER BY created_at DESC;`, [queryParams])
        .then((result) => {
            if (result.rows.length === 0) {
                return Promise.reject({ status: 404, msg: 'Path not found' })
            }
            return result.rows;
        });
    }
    return db.query(`SELECT * FROM articles
                     ORDER BY created_at DESC;`)
        .then((result) => {
            return result.rows;
        });
}

exports.selectArticleById = (articleId) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [articleId])
        .then((result) => {
            if (result.rows.length === 0) {
                return Promise.reject({ status: 404, msg: 'Path not found' })
            }
            return result.rows[0];
        });
}

