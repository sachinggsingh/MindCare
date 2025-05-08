const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskCTRL');
const authAdmin = require('../middleware/authAdmin')

router.post('/create/:problemId/tasks', authAdmin, taskController.createTask); // Create a new task for a specific problem
router.get('/get/:problemId/tasks', authAdmin, taskController.getTasksById); // Get all tasks for a specific problem
router.put('/update/:taskId', authAdmin, taskController.updateTask); // Update a specific task
router.delete('/delete/:taskId', authAdmin, taskController.deleteTask); // Delete a specific task
// Protected routes - require authentication

module.exports = router;
// http://localhost:8000/api/v1/tasks/problems/:problemId/tasks ----->  POST   -----> createTaskForProblem


// http://localhost:8000/api/v1/tasks/problems/:problemId/tasks ----->  GET    -----> getProblemTasks


// http://localhost:8000/api/v1/tasks/tasks/:taskId ----->  PUT    -----> updateProblemTask

// http://localhost:8000/api/v1/tasks/tasks/:taskId ----->  DELETE -----> deleteProblemTask
