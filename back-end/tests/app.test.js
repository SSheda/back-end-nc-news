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

describe("GET /api/account", () => {
    test("200: responds with an array of objects(accounts), each of which should be with the correct properties", () => {
        return request(app)
            .get("/api/account")
            .expect(200)
            .then((response) => {
                const accounts = response.body.accounts;
                expect(accounts).toHaveLength(4);
                accounts.forEach((account) => {
                    expect(account).toMatchObject({
                        user_id: expect.any(Number),
                        username: expect.any(String),
                        password: expect.any(String),
                        email: expect.any(String),
                        avatar_url: expect.any(String)
                    });
                });
            });
    })
})

describe("POST /api/log-in", () => {
    test("200: responds with an array of objects(accounts), each of which should be with the correct properties", () => {
        const loginDetails = {username: 'rogersop', password: "fttth"}
        return request(app)
            .post("/api/log-in")
            .send(loginDetails)
            .expect(200)
            .then((response) => {
                const access = response.body.access;
                expect(accounts).toHaveLength(1);
                accounts.forEach((access) => {
                    expect(account).toMatchObject({
                        user_id: expect.any(Number),
                        username: expect.any(String),
                        password: expect.any(String),
                        email: expect.any(String),
                        avatar_url: expect.any(String)
                    });
                });
            });
    })
})

