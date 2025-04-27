const Task = require('../models/task');
const Problem = require('../models/problem');

const taskController = {
    createTask: async (req, res) => {
        try {
            const { problemId } = req.params;
            const { tasks } = req.body;

            if (!Array.isArray(tasks) || tasks.length === 0) {
                return res.status(400).json({ message: "Tasks array is required and should not be empty." });
            }

            const problem = await Problem.findById(problemId);
            if (!problem) {
                return res.status(404).json({ message: "Problem not found" });
            }

            // Validate all tasks
            const validTasks = tasks.every(task =>
                task.title && task.description && task.difficulty && task.priority
            );
            if (!validTasks) {
                return res.status(400).json({ message: "Each task must have title, description, difficulty, and priority" });
            }

            // Create all tasks
            const createdTasks = await Task.insertMany(
                tasks.map(task => ({
                    title: task.title,
                    description: task.description,
                    difficulty: task.difficulty,
                    priority: task.priority,
                    problemId: problem._id
                }))
            );

            return res.status(201).json({
                message: "Tasks created successfully",
                tasks: createdTasks
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Cannot create tasks" });
        }
    },

    getTasksById: async (req, res) => {
        try {
            const { problemId } = req.params;
            const tasks = await Task.find({ problemId }).populate('problemId');

            if (!tasks || tasks.length === 0) {
                return res.status(404).json({ message: "No tasks found" });
            }

            return res.status(200).json({
                message: "Tasks fetched successfully",
                tasks
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Cannot get tasks" });
        }
    },

    updateTask: async (req, res) => {
        try {
            const { taskId } = req.params;
            const { title, description, difficulty, priority } = req.body;

            if (!title || !description || !difficulty || !priority) {
                return res.status(400).json({ message: "Please fill all the fields" });
            }

            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }

            task.title = title;
            task.description = description;
            task.difficulty = difficulty;
            task.priority = priority;
            await task.save();

            return res.status(200).json({ message: "Task updated successfully", task });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Cannot update task" });
        }
    },

    deleteTask: async (req, res) => {
        try {
            const { taskId } = req.params;
            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }

            await task.remove();
            return res.status(200).json({ message: "Task deleted successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Cannot delete task" });
        }
    }
};

module.exports = taskController;
