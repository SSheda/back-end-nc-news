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
        const createUser = {username: 'yuliia', password: "fvfvf@657ggtHJ", email: 'testing5@email.com'}
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
        const createUser = {username: 'yuliia', password: "fvfvf@657ggtHJ", email: 'testing4@email.com'}
        return request(app)
            .post("/api/signup")
            .send(createUser)
            .expect(409)
            .then((response) => {
                expect(response.body.msg).toBe("testing4@email.com is already been registered");
            });            
    })    
    test("409: responds with error messages if new user username is already been registered", () => {
        const createUser = {username: 'icellusedkars', password: "fvfvf@657ggtHJ", email: 'testing5@email.com'}
        return request(app)
            .post("/api/signup")
            .send(createUser)
            .expect(409)
            .then((response) => {
                expect(response.body.msg).toBe("icellusedkars is already been registered");
            });            
    })   
    test("400: responds with error messages if new user details do not have required properties", () => {
        const createUser = { password: "fvfvf@657ggtHJ", email: 'testing4@email.com'}
        return request(app)
            .post("/api/signup")
            .send(createUser)
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Bad request");
            });            
    })   
    test("422: responds with error messages if new user email has invalid format", () => {
        const createUser = { username: "userhcudv", password: "fvfvf@657ggtHJ", email: 'testing4@ema@il.com'}
        return request(app)
            .post("/api/signup")
            .send(createUser)
            .expect(422)
            .then((response) => {
                expect(response.body.msg).toBe("Contains invalid data");
            });            
    })
    test("422: responds with error messages if new user password has invalid format", () => {
        const createUser = { username: "test", password: "fvfvf657ggtH", email: 'host@email.com'}
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
        const user = {email: 'testing4@email.com', password: "0000@657ggtHJ"}
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
        const user = { password: "0000@657ggtHJ"}
        return request(app)
            .post("/api/login")
            .send(user)
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Invalid Email/Password");
            });            
    })
    test("400: responds with error messages if login user email/password has invalid format", () => {
        const user = {email: 'testinginvalid@email..com', password: "0000@657ggtHJ"}
        return request(app)
            .post("/api/login")
            .send(user)
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Invalid Email/Password");
            });            
    })
    test("400: responds with error messages if login user email/password has invalid format", () => {
        const user = {email: 'testing4@email.com', password: "invalid47678"}
        return request(app)
            .post("/api/login")
            .send(user)
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Invalid Email/Password");
            });            
    })
    test("404: user not registered with provided email", () => {
        const user = {email: 'notregistered@email.com', password: "0000@657ggtHJ"}
        return request(app)
            .post("/api/login")
            .send(user)
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toBe("User not registered");
            });            
    })
    test("401: user is registered but password is not valid", () => {
        const user = {email: 'testing4@email.com', password: "0000@invalidggtHJ"}
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