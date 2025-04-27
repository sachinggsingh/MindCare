const { desc } = require('framer-motion/m');
const mongoose = require('mongoose');

const patientProblemSchema = new mongoose.Schema
({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    // userId : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : 'User',
    //     required : true
    // },
    // problemId : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : 'Problem',
    //     required : true
    // }
},{
    timestamps : true
})

module.exports = mongoose.model('PatientProblem', patientProblemSchema)