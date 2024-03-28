const request = require('supertest');
const app = require('../App'); // Assuming your Express app is exported from App.js

describe('POST /tasks', () => {
  it('should create a new task with valid input', async () => {
    const taskData = {
      title: 'Task Title',
      description: 'Task Description',
      dueDate: '2024-12-31', // Assuming due date is in YYYY-MM-DD format
      status: 'Pending',
      priority: 'High'
    };

    // Send a POST request to the /tasks endpoint with task data
    const response = await request(app)
      .post('/api/tasks')
      .send(taskData);

    // Check the response status code
    expect(response.statusCode).toBe(200);

    // Check if the response contains the success message and the created task
    expect(response.body).toHaveProperty('msg', 'Task Created  Successfully');
    expect(response.body).toHaveProperty('task');
    expect(response.body.task).toHaveProperty('title', 'Task Title');
    expect(response.body.task).toHaveProperty('description', 'Task Description');
    expect(response.body.task).toHaveProperty('dueDate', '2024-12-31');
    expect(response.body.task).toHaveProperty('status', 'Pending');
    expect(response.body.task).toHaveProperty('priority', 'High');
  });

  it('should return errors for invalid input', async () => {
    // Send a POST request to the /tasks endpoint without task data
    const response = await request(app)
      .post('/api/tasks')
      .send({});

    // Check the response status code
    expect(response.statusCode).toBe(401);

    // Check if the response contains error messages
    expect(response.body).toHaveProperty('errors');
  });

  // Add more test cases for edge cases, such as missing fields, etc.
});
