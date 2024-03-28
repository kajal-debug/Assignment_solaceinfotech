const request = require('supertest');
const app = require('../App'); // Assuming your Express app is exported from App.js

describe('GET /tasks', () => {
  it('should return tasks when authenticated', async () => {
    // Assuming you have a function to generate a valid authentication token
    const authToken = generateAuthToken();

    // Send a GET request to the /tasks endpoint with the authentication token in the headers
    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${authToken}`);

    // Check the response status code
    expect(response.statusCode).toBe(200);

    // Check if the response contains tasks
    expect(response.body).toHaveProperty('msg', 'Tasks');
    expect(response.body).toHaveProperty('tasks');
    expect(response.body.tasks.length).toBeGreaterThan(0); // Ensure tasks are returned
  });

  it('should return an error when not authenticated', async () => {
    // Send a GET request to the /tasks endpoint without authentication token
    const response = await request(app)
      .get('/api/tasks');

    // Check the response status code
    expect(response.statusCode).toBe(401);

    // Check if the response contains the error message
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors[0]).toHaveProperty('msg', 'Unauthorized');
  });

  // Add more test cases for edge cases, such as handling empty task list, etc.
});
