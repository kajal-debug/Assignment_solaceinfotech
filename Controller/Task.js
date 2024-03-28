const express = require('express');
const router = express.Router();
const {body , validationResult} = require('express-validator');
const mongoose = require('mongoose');
const Task = require('../Schema/Task');
 const authenticate = require('../middlewares/authenticate');

// Create a new task 
router.post('/tasks', [
    body('title').notEmpty().withMessage('title is Required'),
    body('description').notEmpty().withMessage(' description is Required'),
    body('dueDate').notEmpty().withMessage('dueDate is Required'),
    body('status').notEmpty().withMessage('status is Required'),
    body('priority').notEmpty().withMessage('priority is Required'),
] ,async (request , response) => {
    let errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(401).json({errors : errors.array()})
    }
    try {
        let {title,priority,status,dueDate,description} = request.body;

        // check if the user is exists
        let task = await Task.findOne({title : title});
        if(task){
            return response.status(401).json({errors : [{msg : 'Task is Already Exists'}]});
        }

        task = new Task({title,priority,status,dueDate,description});
        task = await task.save();
        response.status(200).json({msg : 'Task Created  Successfully',task:task});
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
});
// Get task a  task  by ID
router.get('/tasks/:id', async (request, response) => {
    console.log(request.params.id.split(':').join(''), request.params)
    try {
        // Ensure the ID is in the correct format for MongoDB ObjectId
        const id = request.params.id.split(':').join('');
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).json({ errors: [{ msg: 'Invalid task ID' }] });
        }

        let task = await Task.findById(id);

        if (!task) {
            return response.status(404).json({ msg: 'Task not found' });
        }

        response.status(200).json({ msg: 'Task', task: task });
    } catch (error) {
        console.error(error);
        response.status(500).json({ errors: [{ msg: error.message }] });
    }
});
// Get all task using authenticate 

router.get('/tasks', authenticate, async (request, response) => {
    try {
        // Ensure the user is authenticated before accessing tasks
        // Your authentication logic here...

        // Fetch tasks
        const tasks = await Task.find();

        if (tasks.length === 0) {
            return response.status(404).json({ msg: 'No tasks found' });
        }

        // Return tasks
        response.status(200).json({ msg: 'Tasks', tasks: tasks });
    } catch (error) {
        console.error(error);
        response.status(500).json({ errors: [{ msg: 'Internal server error' }] });
    }
});

// Update an existing task by ID
router.put('/tasks/:id', async (req, res) => {
    try {
        const id = req.params.id.split(':').join('');
        const task = await Task.findById(id);
          console.log("task",task)
        if (task) {
            // If task is found, update its properties based on request body
            task.title = req.body.title || task.title;
            task.description = req.body.description || task.description;
            task.dueDate = req.body.dueDate || task.dueDate;
            task.priority = req.body.priority || task.priority;
            task.status = req.body.status || task.status;

            // Save the updated task
            const updatedTask = await task.save();

            res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Delete a task by ID
router.delete('/tasks/:id', async (req, res) => {
    try {
        const id = req.params.id.split(':').join('');
        const task = await Task.findByIdAndDelete(id);

        if (task) {
            res.json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


//pagination for fetching tasks
router.post('/tasks/data', async (req, res) => {
    try {
        // Pagination options
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const limit = parseInt(req.query.limit) || 10; // Default limit to 10 items per page if not provided

        // Calculate the skip value to skip items based on the page number
        const skip = (page - 1) * limit;

        // Fetch tasks with pagination
        const tasks = await Task.find().skip(skip).limit(limit);

        res.json({ tasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});





module.exports = router;