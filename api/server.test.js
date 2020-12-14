// Write your tests here
const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig.js');
let token = undefined;
beforeAll(async () => {
    return await db('users').truncate();
})
describe('POST /api/auth/register', () => {
    it('returns an error if no username or password is provided', async () => {
        const result = await request(server).post('/api/auth/register').send({ username: "", password: "" });
        expect(result.status).toBe(400);
    });
    it('returns a user object upon successful registration', async () => {
        const result = await request(server).post('/api/auth/register').send({ username: "asdf1", password: "asdf1" });
        expect(JSON.parse(result.text).newUser.username).toBe("asdf1")
    });
})
describe('POST /api/auth/login', () => {
    it('returns an error if incorrect credentials are provided', async () => {
        const result = await request(server).post('/api/auth/login').send({ username: "asdf1", password: "asdf2" });
        expect(result.status).toBe(401);
    });
    it('returns a welcome message and jwt upon successful login', async () => {
        const result = await request(server).post('/api/auth/login').send({ username: "asdf1", password: 'asdf1' });
        expect(JSON.parse(result.text).message).toBe("welcome, asdf1");
        token = JSON.parse(result.text).token;
        expect(token).not.toBe(undefined);
    });
})
describe('GET /api/jokes', () => {
    it('returns an error if no token is provided', async () => {
        const result = await request(server).get('/api/jokes');
        expect(result.status).toBe(401);
    })
    it('returns a list of jokes if valid token is provided', async () => {
        const result = await request(server).get('/api/jokes').auth(token, { type: 'bearer' })
        expect(result.status).toBe(200);
        expect(result.body).toHaveLength(3);
    })
})