const request = require('supertest');
const app = require('../App'); // Assuming your Express app is exported from App.js

describe('POST /login', () => {
  it('should return a token for valid credentials', async () => {
    const userData = {
      name: 'user',
      password: 'user@!23'
    };

    // Send a POST request to the /login endpoint with user data
    const response = await request(app)
      .post('/api/auth/login')
      .send(userData);

    // Check the response status code
    expect(response.statusCode).toBe(200);

    // Check if the response contains a token
    expect(response.body).toHaveProperty('token');
  });

  it('should return an error for invalid credentials', async () => {
    const userData = {
      name: 'invaliduser',
      password: 'invalidpassword'
    };

    // Send a POST request to the /login endpoint with invalid user data
    const response = await request(app)
      .post('/api/auth/login')
      .send(userData);

    // Check the response status code
    expect(response.statusCode).toBe(401);

    // Check if the response contains an error message
    expect(response.body).toHaveProperty('errors');
  });

  // Add more test cases for edge cases, such as missing fields, etc.
});
