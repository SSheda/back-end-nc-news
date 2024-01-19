const { convertTimestampToDate } = require("../utils/formatDate.js");
const db = require("./index.js");
const format = require('pg-format');

async function seed(data) {
    return db.query(`DROP TABLE IF EXISTS comments;`)
        .then(() => {
            return db.query(`DROP TABLE IF EXISTS articles;`)
        })
        .then(() => {
            return db.query(`DROP TABLE IF EXISTS topics;`)
        })
        .then(() => {
            return db.query(`DROP TABLE IF EXISTS accounts;`);
        })
        .then(() => {
            return db.query(`CREATE TABLE topics (
                            slug VARCHAR PRIMARY KEY,
                            description VARCHAR
                            );`);
        })
        .then(() => {
            return db.query(`CREATE TABLE accounts (
                                user_id serial PRIMARY KEY,
                                username VARCHAR UNIQUE NOT NULL,
                                password VARCHAR NOT NULL,
                                email VARCHAR UNIQUE NOT NULL,
                                avatar_url VARCHAR
                         );`)
        })
        .then(() => {
            return db.query(`CREATE TABLE articles (
                            article_id SERIAL PRIMARY KEY,
                            title VARCHAR NOT NULL,
                            topic VARCHAR NOT NULL REFERENCES topics(slug),
                            author VARCHAR NOT NULL REFERENCES accounts(username),
                            body VARCHAR NOT NULL,
                            created_at TIMESTAMP DEFAULT NOW(),
                            likes INT DEFAULT 0 NOT NULL,
                            article_img_url VARCHAR DEFAULT 'https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700'
            );`)
        })
        .then(() => {
            return db.query(`CREATE TABLE comments (
                            comment_id SERIAL PRIMARY KEY,
                            body VARCHAR NOT NULL,
                            likes INT DEFAULT 0 NOT NULL,
                            author VARCHAR REFERENCES accounts(username) NOT NULL,
                            article_id INT REFERENCES articles(article_id) NOT NULL,
                            created_at TIMESTAMP DEFAULT NOW()
            );`);
        })
        .then(() => {
            return db.query(format(`INSERT INTO accounts
                            (username, password, email, avatar_url)
                            VALUES 
                            %L
                            RETURNING*;`,
                data.accountData.map(({ username, password, email, avatar_url }) => [username, password, email, avatar_url])))
        })
        .then(() => {
            return db.query(format(`INSERT INTO topics 
                                   (slug, description) 
                                    VALUES %L;`,
                data.topicsData.map(({ slug, description }) => [slug, description])))
        })
        .then(() => {
            const formattedArticleData = data.articlesData.map(convertTimestampToDate);
            return db.query(format(`INSERT INTO articles 
                                    (title, topic, author, body, created_at, likes, article_img_url) 
                                    VALUES %L 
                                    RETURNING *;`,
                formattedArticleData.map(({ title, topic, author, body, created_at, likes = 0, article_img_url }) => [title, topic, author, body, created_at, likes, article_img_url])))
        })
        .then(() => {
            const formattedCommentsData = data.commentsData.map(convertTimestampToDate);
            return db.query(format(`INSERT INTO comments 
                                    (body, likes, author, article_id, created_at) 
                                    VALUES %L 
                                    RETURNING *;`,
                formattedCommentsData.map(({ body, likes = 0, author, article_id, created_at }) => [body, likes, author, article_id, created_at])))
        })
}
module.exports = seed;
