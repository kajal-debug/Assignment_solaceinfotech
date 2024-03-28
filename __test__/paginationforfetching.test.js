const request = require('supertest');
const app = require('../App'); // Assuming your Express app is exported from App.js

describe('POST /tasks/data', () => {
  it('should return paginated task data with default pagination options', async () => {
    // Send a POST request to the /tasks/data endpoint without query parameters
    const response = await request(app)
      .post('/api/tasks/data');

    // Check the response status code
    expect(response.statusCode).toBe(200);

    // Check if the response contains the tasks array
    expect(response.body).toHaveProperty('tasks');
    expect(Array.isArray(response.body.tasks)).toBe(true);
  });

  it('should return paginated task data with custom pagination options', async () => {
    // Send a POST request to the /tasks/data endpoint with custom pagination options
    const response = await request(app)
      .post('/api/tasks/data')
      .query({ page: 2, limit: 5 }); // Example: Get page 2 with 5 items per page

    // Check the response status code
    expect(response.statusCode).toBe(200);

    // Check if the response contains the tasks array
    expect(response.body).toHaveProperty('tasks');
    expect(Array.isArray(response.body.tasks)).toBe(true);
    // Add additional assertions based on your pagination logic
  });

  // Add more test cases for edge cases, such as negative page numbers, large limit values, etc.
});
