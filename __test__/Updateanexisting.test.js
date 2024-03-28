const request = require('supertest');
const app = require('../App'); // Assuming your Express app is exported from App.js

describe('PUT /tasks/:id', () => {
  it('should update the task with valid data', async () => {
    // Assuming you have an existing task ID in your database
    const taskId = 'your_task_id';

    // Updated task data
    const updatedTaskData = {
      title: 'Updated Task Title',
      description: 'Updated task description',
      dueDate: '2024-12-31',
      priority: 'High',
      status: 'In Progress'
    };

    // Send a PUT request to the /tasks/:id endpoint with updated task data
    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send(updatedTaskData);

    // Check the response status code
    expect(response.statusCode).toBe(200);

    // Check if the response contains the updated task
    expect(response.body).toHaveProperty('message', 'Task updated successfully');
    expect(response.body).toHaveProperty('task');
    expect(response.body.task).toMatchObject(updatedTaskData); // Ensure task data is updated
  });

  it('should return an error for non-existing task ID', async () => {
    // Assuming you have a non-existing task ID in your database
    const nonExistingTaskId = 'non_existing_task_id';

    // Updated task data
    const updatedTaskData = {
      title: 'Updated Task Title',
      description: 'Updated task description',
      dueDate: '2024-12-31',
      priority: 'High',
      status: 'In Progress'
    };

    // Send a PUT request to the /tasks/:id endpoint with non-existing task ID
    const response = await request(app)
      .put(`/api/tasks/${nonExistingTaskId}`)
      .send(updatedTaskData);

    // Check the response status code
    expect(response.statusCode).toBe(404);

    // Check if the response contains the error message
    expect(response.body).toHaveProperty('message', 'Task not found');
  });

  // Add more test cases for edge cases, such as handling invalid task ID, missing fields, etc.
});
