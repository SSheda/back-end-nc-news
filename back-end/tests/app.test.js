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
        const createUser = {username: 'yuliia', password: "efef4fv@!", email: 'testing@email.com'}
        return request(app)
            .post("/api/signup")
            .send(createUser)
            .expect(201)
            .then((response) => {
                const newUser = response.body.newUser;

                expect(newUser.password).not.toBe(createUser.password)

                expect(newUser).toEqual({
                    user_id: 1,
                    username: 'yuliia',
                    password: expect.any(String),
                    email: 'testing@email.com',
                    avatar_url: null
                });                
            });
    })
})

