const request = require('supertest');
const app = require('../App'); // Assuming your Express app is exported from App.js

describe('POST /logout', () => {
  it('should return a success message on logout', async () => {
    // Send a POST request to the /logout endpoint
    const response = await request(app)
      .post('/api/auth/logout');

    // Check the response status code
    expect(response.statusCode).toBe(200);

    // Check if the response contains the logout message
    expect(response.body).toEqual({ msg: 'Logout  Successfully' });
  });
});
