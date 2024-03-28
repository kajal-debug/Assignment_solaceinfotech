const request = require('supertest');
const app = require('../App'); // Assuming your Express app is exported from App.js

describe('GET /tasks/:id', () => {
  it('should return a task with valid ID', async () => {
    // Create a new task to retrieve its ID
    const newTask = await Task.create({
      title: 'Task Title',
      description: 'Task Description',
      dueDate: '2024-12-31', // Assuming due date is in YYYY-MM-DD format
      status: 'Pending',
      priority: 'High'
    });

    // Send a GET request to the /tasks/:id endpoint with the ID of the newly created task
    const response = await request(app)
      .get(`/api/tasks/${newTask._id}`);

    // Check the response status code
    expect(response.statusCode).toBe(200);

    // Check if the response contains the task data
    expect(response.body).toHaveProperty('msg', 'Task');
    expect(response.body).toHaveProperty('task');
    expect(response.body.task).toHaveProperty('title', 'Task Title');
    expect(response.body.task).toHaveProperty('description', 'Task Description');
    expect(response.body.task).toHaveProperty('dueDate', '2024-12-31');
    expect(response.body.task).toHaveProperty('status', 'Pending');
    expect(response.body.task).toHaveProperty('priority', 'High');
  });

  it('should return an error for invalid ID', async () => {
    // Send a GET request to the /tasks/:id endpoint with an invalid ID
    const response = await request(app)
      .get('/api/tasks/invalidID');

    // Check the response status code
    expect(response.statusCode).toBe(400);

    // Check if the response contains the error message
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors[0]).toHaveProperty('msg', 'Invalid task ID');
  });

  it('should return an error if task is not found', async () => {
    // Generate a valid MongoDB ObjectId that does not exist in the database
    const invalidID = mongoose.Types.ObjectId();

    // Send a GET request to the /tasks/:id endpoint with the invalid ID
    const response = await request(app)
      .get(`/api/tasks/${invalidID}`);

    // Check the response status code
    expect(response.statusCode).toBe(404);

    // Check if the response contains the error message
    expect(response.body).toHaveProperty('msg', 'Task not found');
  });

  // Add more test cases for edge cases, such as handling non-existent IDs, etc.
});
