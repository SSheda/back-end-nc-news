const request = require('supertest');
const app = require('../app.js')
const seed = require('../db/seed');
const data = require('../db/test-data/index')
const db = require('../db/index')
const availableApi = require("../endpoints.json")


beforeEach(() => {
    return seed(data);
});

afterAll(() => {
    return db.end();
});

describe('Sample Test', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true)
    })
})

/*-----------------------------------------------------------------------------------------------*/

describe("GET /api", () => {
    test("200: responds with an object describing all the available endpoints on available API", () => {
        return request(app)
            .get("/api")
            .expect(200)
            .then((response) => {
                const endpoints = response.body.endpoints;

                expect(endpoints).toEqual(availableApi)

                expect(typeof endpoints).toBe("object");
                for (const key in endpoints) {
                    expect(endpoints[key]).toMatchObject({
                        description: expect.any(String),
                        queries: expect.any(Array),
                        exampleResponse: expect.any(Object)
                    });
                }
            });
    });
});

/*-----------------------------------------------------------------------------------------------*/

describe("404 Path not found", () => {
    test("404: responds with an error if path is invalid", () => {
        return request(app)
            .get("/apiie")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Path not found');
            });
    });
});

/*-----------------------------------------------------------------------------------------------*/

describe("POST /api/signup", () => {
    test("201: responds with an object of a new user containing correct properties", () => {
        const createUser = { username: 'yuliia', password: "fvfvf@657ggtHJ", email: 'testing5@email.com' }
        return request(app)
            .post("/api/signup")
            .send(createUser)
            .expect(201)
            .then((response) => {
                const newUser = response.body.newUser;

                expect(newUser.password).not.toBe(createUser.password)

                expect(newUser).toEqual({
                    user_id: 5,
                    username: 'yuliia',
                    password: expect.any(String),
                    email: 'testing5@email.com',
                    avatar_url: null
                });
            });
    })
    test("409: responds with error messages if new user email is already been registered", () => {
        const createUser = { username: 'yuliia', password: "fvfvf@657ggtHJ", email: 'testing4@email.com' }
        return request(app)
            .post("/api/signup")
            .send(createUser)
            .expect(409)
            .then((response) => {
                expect(response.body.msg).toBe("testing4@email.com is already been registered");
            });
    })
    test("409: responds with error messages if new user username is already been registered", () => {
        const createUser = { username: 'icellusedkars', password: "fvfvf@657ggtHJ", email: 'testing5@email.com' }
        return request(app)
            .post("/api/signup")
            .send(createUser)
            .expect(409)
            .then((response) => {
                expect(response.body.msg).toBe("icellusedkars is already been registered");
            });
    })
    test("400: responds with error messages if new user details do not have required properties", () => {
        const createUser = { password: "fvfvf@657ggtHJ", email: 'testing4@email.com' }
        return request(app)
            .post("/api/signup")
            .send(createUser)
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Bad request");
            });
    })
    test("422: responds with error messages if new user email has invalid format", () => {
        const createUser = { username: "userhcudv", password: "fvfvf@657ggtHJ", email: 'testing4@ema@il.com' }
        return request(app)
            .post("/api/signup")
            .send(createUser)
            .expect(422)
            .then((response) => {
                expect(response.body.msg).toBe("Contains invalid data");
            });
    })
    test("422: responds with error messages if new user password has invalid format", () => {
        const createUser = { username: "test", password: "fvfvf657ggtH", email: 'host@email.com' }
        return request(app)
            .post("/api/signup")
            .send(createUser)
            .expect(422)
            .then((response) => {
                expect(response.body.msg).toBe("Contains invalid data");
            });
    })
})

/*-----------------------------------------------------------------------------------------------*/

describe("POST /api/login", () => {
    test("201: responds with an object of a new user containing correct properties", () => {
        const user = { email: 'testing4@email.com', password: "0000@657ggtHJ" }
        return request(app)
            .post("/api/login")
            .send(user)
            .expect(201)
            .then((response) => {
                const logedInUser = response.body.user;

                expect(logedInUser).not.toBe(user.password)

                expect(logedInUser).toEqual({
                    user_id: 4,
                    username: 'lurker',
                    password: expect.any(String),
                    email: 'testing4@email.com',
                    avatar_url: null
                });
            });
    })
    test("400: responds with error messages login details do not have required properties", () => {
        const user = { password: "0000@657ggtHJ" }
        return request(app)
            .post("/api/login")
            .send(user)
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Invalid Email/Password");
            });
    })
    test("400: responds with error messages if login user email/password has invalid format", () => {
        const user = { email: 'testinginvalid@email..com', password: "0000@657ggtHJ" }
        return request(app)
            .post("/api/login")
            .send(user)
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Invalid Email/Password");
            });
    })
    test("400: responds with error messages if login user email/password has invalid format", () => {
        const user = { email: 'testing4@email.com', password: "invalid47678" }
        return request(app)
            .post("/api/login")
            .send(user)
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Invalid Email/Password");
            });
    })
    test("404: user not registered with provided email", () => {
        const user = { email: 'notregistered@email.com', password: "0000@657ggtHJ" }
        return request(app)
            .post("/api/login")
            .send(user)
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toBe("User not registered");
            });
    })
    test("401: user is registered but password is not valid", () => {
        const user = { email: 'testing4@email.com', password: "0000@invalidggtHJ" }
        return request(app)
            .post("/api/login")
            .send(user)
            .expect(401)
            .then((response) => {
                expect(response.body.msg).toBe("Username/Password not valid");
            });
    })
})

describe("GET /api/topics", () => {
    test("200: responds with an array of of topic objects, , each of which should have description and slug properties", () => {
        return request(app)
            .get("/api/topics")
            .expect(200)
            .then((response) => {
                const topics = response.body.topics;
                expect(topics).toHaveLength(3);
                topics.forEach((topic) => {
                    expect(topic).toMatchObject({
                        description: expect.any(String),
                        slug: expect.any(String)
                    });
                });
            });
    });
});

/*-----------------------------------------------------------------------------------------------*/

describe("GET /api/articles", () => {
    test(`200: responds with an articles array of article objects, each of which should be with the correct properties`, () => {
        return request(app)
            .get("/api/articles")
            .expect(200)
            .then((response) => {
                const articles = response.body.article;
                expect(articles.length).toBe(13)
                articles.forEach((article) => {
                    expect(article).toMatchObject({
                        article_id: expect.any(Number),
                        title: expect.any(String),
                        topic: expect.any(String),
                        author: expect.any(String),
                        body: expect.any(String),
                        created_at: expect.any(String),
                        likes: expect.any(Number),
                        article_img_url: expect.any(String),
                    });
                });
            });
    });
    test(`200: responds with an articles array sorted by date in descending order`, () => {
        return request(app)
            .get("/api/articles")
            .expect(200)
            .then((response) => {
                const articles = response.body.article;

                expect(articles.length).toBe(13);
                expect(articles).toBeSortedBy("created_at", { descending: true });
            });
    });
    test(`200: QUERY(author) responds with an array of article objects that belongs to author`, () => {
        return request(app)
            .get("/api/articles?author=rogersop")
            .expect(200)
            .then((response) => {
                const articles = response.body.article;
                expect(articles.length).toBe(3)
                articles.forEach((article) => {
                    expect(article).toMatchObject({
                        article_id: expect.any(Number),
                        title: expect.any(String),
                        topic: expect.any(String),
                        author: expect.any(String),
                        body: expect.any(String),
                        created_at: expect.any(String),
                        likes: expect.any(Number),
                        article_img_url: expect.any(String),
                    });
                });
            });
    });
    test(`200: QUERY(topic) responds with an array of article objects that belongs to author`, () => {
        return request(app)
            .get("/api/articles?topic=mitch")
            .expect(200)
            .then((response) => {
                const articles = response.body.article;
                expect(articles.length).toBe(12)
                articles.forEach((article) => {
                    expect(article).toMatchObject({
                        article_id: expect.any(Number),
                        title: expect.any(String),
                        topic: expect.any(String),
                        author: expect.any(String),
                        body: expect.any(String),
                        created_at: expect.any(String),
                        likes: expect.any(Number),
                        article_img_url: expect.any(String),
                    });
                });
            });
    });
    test(`404: responds with an error message if QUERY input does not exist`, () => {
        return request(app)
            .get("/api/articles?author=NotExisting")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Path not found');
            });
    });
});

/*-----------------------------------------------------------------------------------------------*/

describe("GET /api/articles/:article_id", () => {
    test(`200: responds with an article object that has got the correct properties`, () => {
        return request(app)
            .get("/api/articles/10")
            .expect(200)
            .then((response) => {
                const article = response.body.article;
                expect(article).toMatchObject({
                    article_id: expect.any(Number),
                    title: expect.any(String),
                    topic: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    created_at: expect.any(String),
                    likes: expect.any(Number),
                    article_img_url: expect.any(String),
                });
            });
    });
    test(`400: responds with an error message if article_id is not a valid type`, () => {
        return request(app)
            .get("/api/articles/banana")
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('Bad request');
            });
    });
    test(`404: responds with an error message if article_id does not exist`, () => {
        return request(app)
            .get("/api/articles/14")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Path not found');
            });
    });
});

/*-----------------------------------------------------------------------------------------------*/

describe("PATCH /api/articles/:article_id", () => {
    test(`200: respons with updated only article's likes property, where likes are incremented`, () => {
        const voteChanges = { inc_votes: 1 };
        return request(app)
            .patch("/api/articles/10")
            .send(voteChanges)
            .expect(200)
            .then((response) => {
                const updatedArticle = response.body.article;
                expect(updatedArticle).toEqual({
                    article_id: 10,
                    title: "Seven inspirational thought leaders from Manchester UK",
                    topic: "mitch",
                    author: "rogersop",
                    body: "Who are we kidding, there is only one, and it's Mitch!",
                    created_at: expect.any(String),
                    likes: -2,
                    article_img_url: "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
                });
            });
    });
    test(`200: respons with updated only article's likes property, where votes are decremented`, () => {
        const voteChanges = { inc_votes: -1 };
        return request(app)
            .patch("/api/articles/10")
            .send(voteChanges)
            .expect(200)
            .then((response) => {
                const updatedArticle = response.body.article;
                expect(updatedArticle).toEqual({
                    article_id: 10,
                    title: "Seven inspirational thought leaders from Manchester UK",
                    topic: "mitch",
                    author: "rogersop",
                    body: "Who are we kidding, there is only one, and it's Mitch!",
                    created_at: expect.any(String),
                    likes: -4,
                    article_img_url: "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
                });
            });
    });
    test(`404: responds with an error message if article_id does not exist`, () => {
        const voteChanges = { inc_votes: 1 };
        return request(app)
            .patch("/api/articles/25")
            .send(voteChanges)
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Path not found');
            });
    });
    test(`400: responds with an error message if article_id is not a valid type`, () => {
        const voteChanges = { inc_votes: 1 };
        return request(app)
            .patch("/api/articles/banana")
            .send(voteChanges)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('Bad request');
            });
    });
    test("400: responds with an error message if likes has invalid key name", () => {
        const voteChanges = { banana: 1 };
        return request(app)
            .patch("/api/articles/10")
            .send(voteChanges)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Bad request");
            })
    });
    test("200: respons with updated article's likes property, and ignores other keys", () => {
        const voteChanges = { inc_votes: 1, banana: 10 };
        return request(app)
            .patch("/api/articles/10")
            .send(voteChanges)
            .expect(200)
            .then((response) => {
                const updatedArticle = response.body.article;
                expect(updatedArticle).toEqual({
                    article_id: 10,
                    title: "Seven inspirational thought leaders from Manchester UK",
                    topic: "mitch",
                    author: "rogersop",
                    body: "Who are we kidding, there is only one, and it's Mitch!",
                    created_at: expect.any(String),
                    likes: -2,
                    article_img_url: "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
                });
            });
    });
});

/*---------------------------------------------------------------------------------------------------------*/

describe("GET /api/articles/:article_id/comments", () => {
    test(`200: responds an array of comments for the given article_id of which each comment should have the correct properties`, () => {
        return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then((response) => {
                const comments = response.body.comments;

                expect(comments.length).toBe(12)

                comments.forEach((comment) => {
                    expect(comment).toMatchObject({
                        comment_id: expect.any(Number),
                        likes: expect.any(Number),
                        created_at: expect.any(String),
                        author: expect.any(String),
                        body: expect.any(String),
                        article_id: expect.any(Number)
                    });
                });
            });
    });
    test(`200: responds an array of comments should be sorted by date in descending order`, () => {
        return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then((response) => {
                const comments = response.body.comments;

                expect(comments.length).toBe(12)
                expect(comments).toBeSortedBy("created_at", { descending: true });
            });
    });
    test(`400: responds with an error message if article_id is not a valid type`, () => {
        return request(app)
            .get("/api/articles/banana/comments")
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('Bad request');
            });
    });
    test(`200: responds with empty array if article_id is valid but has no associated comments.`, () => {
        return request(app)
            .get("/api/articles/2/comments")
            .expect(200)
            .then((response) => {
                const comments = response.body.comments;
                expect(comments).toEqual([]);
            });
    });
    test(`404: responds with an error message if article_id does not exist`, () => {
        return request(app)
            .get("/api/articles/25/comments")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Path not found');
            });
    });
});

/*--------------------------------------------------------------------------------------------------------*/

describe("POST /api/articles/:article_id/comments", () => {
    test(`201: respons with the posted comment which is an object with correct properties`, () => {
        const newComment = {
            body: "My new comment",
            username: "icellusedkars"
        };
        return request(app)
            .post("/api/articles/12/comments")
            .send(newComment)
            .expect(201)
            .then((response) => {
                const postedComment = response.body.comment;
                expect(postedComment).toEqual({
                    comment_id: 19,
                    body: expect.any(String),
                    article_id: 12,
                    author: expect.any(String),
                    likes: expect.any(Number),
                    created_at: expect.any(String)
                });
            });
    });
    test(`404: responds with an error message if article_id does not exist`, () => {
        const newComment = {
            body: "My new comment",
            username: "icellusedkars"
        };
        return request(app)
            .post("/api/articles/25/comments")
            .send(newComment)
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Path not found');
            });
    });
    test(`400: responds with an error message if article_id is not a valid type`, () => {
        const newComment = {
            body: "My new comment",
            username: "icellusedkars"
        };
        return request(app)
            .post("/api/articles/bannana/comments")
            .send(newComment)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('Bad request');
            });
    });
    test(`404: responds with an error message if user does not exist`, () => {
        const newComment = {
            body: "My new comment",
            username: "jgjjhdvsdvvvvvvvv"
        };
        return request(app)
            .post("/api/articles/12/comments")
            .send(newComment)
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Path not found');
            });
    });
    test("400: responds with an error message if comment has invalid keys structure", () => {
        const newComment = { username: "butter_bridge" }
        return request(app)
            .post("/api/articles/11/comments")
            .send(newComment)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Bad Request");
            });
    });
});

/*--------------------------------------------------------------------------------------------------------*/

describe("GET /api/comments", () => {
    test(`200: responds with array of comment object that has got the correct properties`, () => {
        return request(app)
            .get("/api/comments")
            .expect(200)
            .then((response) => {
                const comments = response.body.comments;
                expect(comments.length).toBe(18)
                comments.forEach((comment) => {
                    expect(comment).toMatchObject({
                        comment_id: expect.any(Number),
                        body: expect.any(String),
                        likes: expect.any(Number),
                        author: expect.any(String),
                        article_id: expect.any(Number),
                        created_at: expect.any(String),
                    });
                });
            });
    });
    test(`200: QUERY(author) responds with an array of comments objects that belongs to author`, () => {
        return request(app)
            .get("/api/comments?author=butter_bridge")
            .expect(200)
            .then((response) => {
                const comments = response.body.comments;
                expect(comments.length).toBe(5)
                comments.forEach((comment) => {
                    expect(comment).toMatchObject({
                        comment_id: expect.any(Number),
                        body: expect.any(String),
                        likes: expect.any(Number),
                        author: expect.any(String),
                        article_id: expect.any(Number),
                        created_at: expect.any(String),
                    });
                });
            });
    });
    test(`200: QUERY(article_id) responds with an array of comments objects that belongs to provided article id`, () => {
        return request(app)
            .get("/api/comments?article_id=1")
            .expect(200)
            .then((response) => {
                const comments = response.body.comments;
                expect(comments.length).toBe(12)
                comments.forEach((comment) => {
                    expect(comment).toMatchObject({
                        comment_id: expect.any(Number),
                        body: expect.any(String),
                        likes: expect.any(Number),
                        author: expect.any(String),
                        article_id: expect.any(Number),
                        created_at: expect.any(String),
                    });
                });
            });
    });
    test(`404: responds with an error message if QUERY input does not exist`, () => {
        return request(app)
            .get("/api/comments?article_id=100")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Path not found');
            });
    });
});

/*-----------------------------------------------------------------------------------------------*/

describe("GET /api/comments/:comment_id", () => {
    test(`200: responds with an article object that has got the correct properties`, () => {
        return request(app)
            .get("/api/comments/5")
            .expect(200)
            .then((response) => {
                const comment = response.body.comment;
                expect(comment).toMatchObject({
                    comment_id: expect.any(Number),
                    body: expect.any(String),
                    likes: expect.any(Number),
                    author: expect.any(String),
                    article_id: expect.any(Number),
                    created_at: expect.any(String),
                });
            });
    });
    test(`400: responds with an error message if comment_id is not a valid type`, () => {
        return request(app)
            .get("/api/comments/banana")
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('Bad request');
            });
    });
    test(`404: responds with an error message if comment_id does not exist`, () => {
        return request(app)
            .get("/api/comments/100")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Path not found');
            });
    });
});

/*---------------------------------------------------------------------------------------------------------- */

describe("DELETE /api/comments/:comment_id", () => {
    test(`204: deletes comment and respons with 204 status error, comment has no content`, () => {
        return request(app)
            .delete("/api/comments/1")
            .expect(204)
    });
    test(`404: responds with error 404 status when used comment id that was deleted`, () => {
        return request(app)
        .delete("/api/comments/1")
        .expect(204)
        .then(() => {
            return request(app)
                .get("/api/comments/1")
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).toBe('Path not found');
                });
        });
    });
    test(`404: responds with error 404 status when used non-existed comment id `, () => {
        return request(app)
            .get("/api/comments/88")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Path not found');
            });
    });
    test(`400: responds with an error message if comment_id is not a valid type`, () => {
        return request(app)
            .delete("/api/comments/banana")
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('Bad request');
            });
    });
});

/*-------------------------------------------------------------------------------------------------------*/

