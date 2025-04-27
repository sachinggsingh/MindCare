const mongoose = require('mongoose');
// const Problem =  require('./problem')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // role :
    // {
    //     type : Number,
    //     default:0
    // },
    isAdmin: {
        type: Boolean,
        default: false
    },
    problemId :  {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Problem',        
    }
},
timestamps = { createdAt: 'created_at', updatedAt: 'updated_at' }
);
module.exports = mongoose.model('User', userSchema);