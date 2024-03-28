const request = require('supertest');
const app = require('../App'); // Assuming your Express app is exported from App.js

describe('DELETE /tasks/:id', () => {
  it('should delete the task with valid ID', async () => {
    // Assuming you have an existing task ID in your database
    const taskId = 'your_task_id';

    // Send a DELETE request to the /tasks/:id endpoint with the task ID
    const response = await request(app)
      .delete(`/api/tasks/${taskId}`);

    // Check the response status code
    expect(response.statusCode).toBe(200);

    // Check if the response contains the success message
    expect(response.body).toHaveProperty('message', 'Task deleted successfully');
  });

  it('should return an error for non-existing task ID', async () => {
    // Assuming you have a non-existing task ID in your database
    const nonExistingTaskId = 'non_existing_task_id';

    // Send a DELETE request to the /tasks/:id endpoint with non-existing task ID
    const response = await request(app)
      .delete(`/api/tasks/${nonExistingTaskId}`);

    // Check the response status code
    expect(response.statusCode).toBe(404);

    // Check if the response contains the error message
    expect(response.body).toHaveProperty('message', 'Task not found');
  });

  // Add more test cases for edge cases, such as handling invalid task ID, etc.
});
