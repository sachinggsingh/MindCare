const mongoose = require('mongoose');

const recoverySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
        required: true
    },
    currentStep: {
        type: Number,
        default: 0
    },
    totalTasks: {
        type: Number,
        default: 0
    },
    completedTasks: {
        type: Number,
        default: 0
    },
    progressPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    steps: [{ 
        stepNumber: Number,
        description: String,
        completed: {
            type: Boolean,
            default: false
        },
        completedAt: {
            type: Date,
            default: null
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Recovery', recoverySchema);