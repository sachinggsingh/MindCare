const Recovery = require('../models/recovery');
const Task = require('../models/task');

const recoveryCTRL = {
    getRecoveryProgress: async (req, res) => {
        try {
            const { problemId } = req.params;
            const userId = req.user._id;

            // Get total and completed tasks
            const totalTasks = await Task.countDocuments({ problemId, userId });
            const completedTasks = await Task.countDocuments({ 
                problemId, 
                userId, 
                isCompleted: true 
            });

            // Calculate progress percentage
            const progressPercentage = totalTasks > 0 
                ? Math.round((completedTasks / totalTasks) * 100) 
                : 0;

            // Get or create recovery document
            let recovery = await Recovery.findOne({ userId, problemId });

            if (!recovery) {
                recovery = await Recovery.create({
                    userId,
                    problemId,
                    totalTasks,
                    completedTasks,
                    progressPercentage
                });
            } else {
                recovery = await Recovery.findOneAndUpdate(
                    { userId, problemId },
                    { 
                        totalTasks,
                        completedTasks,
                        progressPercentage
                    },
                    { new: true }
                );
            }

            const populatedRecovery = await Recovery.findById(recovery._id)
                .populate('userId', 'name email')
                .populate('problemId', 'name description');

            return res.status(200).json({
                success: true,
                recovery: {
                    _id: populatedRecovery._id,
                    user: {
                        _id: populatedRecovery.userId._id,
                        name: populatedRecovery.userId.name,
                        email: populatedRecovery.userId.email
                    },
                    problem: {
                        _id: populatedRecovery.problemId._id,
                        name: populatedRecovery.problemId.name,
                        description: populatedRecovery.problemId.description
                    },
                    currentStep: populatedRecovery.currentStep,
                    totalTasks,
                    completedTasks,
                    progressPercentage,
                    steps: populatedRecovery.steps,
                    createdAt: populatedRecovery.createdAt,
                    updatedAt: populatedRecovery.updatedAt
                }
            });

        } catch (error) {
            console.error('Get recovery progress error:', error);
            return res.status(500).json({
                success: false,
                message: "Error fetching recovery progress",
                error: error.message
            });
        }
    },

    updateRecoveryProgress: async (req, res) => {
        try {
            const { problemId } = req.params;
            const userId = req.user.id;
            const { stepNumber, description } = req.body;

            let recovery = await Recovery.findOne({ userId, problemId });

            if (!recovery) {
                return res.status(404).json({
                    success: false,
                    message: "Recovery progress not found"
                });
            }

            // Update step completion
            const stepIndex = recovery.steps.findIndex(s => s.stepNumber === stepNumber);
            
            if (stepIndex === -1) {
                recovery.steps.push({
                    stepNumber,
                    description,
                    completed: true,
                    completedAt: new Date()
                });
            } else {
                recovery.steps[stepIndex].completed = true;
                recovery.steps[stepIndex].completedAt = new Date();
            }

            recovery.currentStep = Math.max(...recovery.steps.map(s => s.stepNumber), 0);
            await recovery.save();

            return res.status(200).json({
                success: true,
                message: "Recovery progress updated successfully",
                recovery: {
                    currentStep: recovery.currentStep,
                    steps: recovery.steps
                }
            });

        } catch (error) {
            console.error('Update recovery progress error:', error);
            return res.status(500).json({
                success: false,
                message: "Error updating recovery progress",
                error: error.message
            });
        }
    }
};

module.exports = recoveryCTRL;