const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskCTRL');

router.post('/create/:problemId/tasks', taskController.createTask); // Create a new task for a specific problem
router.get('/get/:problemId/tasks', taskController.getTasksById); // Get all tasks for a specific problem
router.put('/update/:taskId', taskController.updateTask); // Update a specific task
router.delete('/delete/:taskId', taskController.deleteTask); // Delete a specific task
// Protected routes - require authentication

module.exports = router;
// http://localhost:8000/api/v1/tasks/problems/:problemId/tasks ----->  POST   -----> createTaskForProblem


// http://localhost:8000/api/v1/tasks/problems/:problemId/tasks ----->  GET    -----> getProblemTasks


// http://localhost:8000/api/v1/tasks/tasks/:taskId ----->  PUT    -----> updateProblemTask

// http://localhost:8000/api/v1/tasks/tasks/:taskId ----->  DELETE -----> deleteProblemTask
