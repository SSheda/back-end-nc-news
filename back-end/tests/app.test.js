const request = require('supertest');
const app = require('../app.js')
const seed = require('../db/seed');
const data = require('../db/test-data/index')
const db = require('../db/index')

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
    test("400: responds with error messages if new user trying to register existed email", () => {
        const createUser = {username: 'yuliia', password: "fvfvf@657ggtHJ", email: 'testing4@email.com'}
        return request(app)
            .post("/api/signup")
            .send(createUser)
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Bad request (testing4@email.com) already exists.");
            });            
    })    
    test("400: responds with error messages if new user trying to register existed username", () => {
        const createUser = {username: 'icellusedkars', password: "fvfvf@657ggtHJ", email: 'testing5@email.com'}
        return request(app)
            .post("/api/signup")
            .send(createUser)
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Bad request (icellusedkars) already exists.");
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
    test("400: responds with error messages if new user email is invalid", () => {
        const createUser = { username: "userhcudv", password: "fvfvf@657ggtHJ", email: 'testing4@ema@il.com'}
        return request(app)
            .post("/api/signup")
            .send(createUser)
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Bad request");
            });            
    })
    test("400: responds with error messages if new user password is invalid", () => {
        const createUser = { username: "test", password: "fvfvf657ggtH", email: 'host@email.com'}
        return request(app)
            .post("/api/signup")
            .send(createUser)
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Bad request");
            });            
    })
})







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
})

