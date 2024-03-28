const request = require('supertest');
const startAppPromise = require('../App');

let server;

beforeAll(async () => {
  server = await startAppPromise;
});

afterAll(async () => {
  if (server) {
    server.close();
  }
});

describe('POST /api/auth/register', () => {
  it('should register a new user with valid input', async () => {
    const response = await request(server)
      .post('/api/auth/register')
      .send({
        name: 'User',
        email: 'test@exampless.com',
        password: 'password12233'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('msg', 'Registration is Success');
    expect(response.body.user).toHaveProperty('name', 'Test User');
    expect(response.body.user).toHaveProperty('email', 'test@example.com');
  });
});
