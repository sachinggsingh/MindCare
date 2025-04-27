const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true
    },
    symptoms :[{
        type: String,
        required: true
    }],
    solutions :[{
        type: String,
        required: true
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: true}
);


module.exports = mongoose.model('Problem', ProblemSchema);