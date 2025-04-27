const PatientProblem  = require('../models/patientProblem');

const createPatientProblem = async (req, res) => {
    try {
        const {title, description,} = req.body;
        if(!title || !description ){
            return res.status(400).json({msg:"Please enter all fields"});
        }
        const existProblem = await PatientProblem.findOne({title,});
        if(existProblem) 
            return res.status(400).json({msg:"Problem already exists"});

        const problem = await PatientProblem.create({
            title,
            description,
            // userId
        });

        return res.status(200).json({msg:"Problem created successfully",problem :{
            _id : problem._id,
            title : problem.title,
            description : problem.description,
            // userId : problem.userId
        }});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Error in creating problem",success:false,error:error.message});
        }

}
const getPatientProblem = async (req, res) => {
    try
    {
        const problems = await PatientProblem.find()
        if(!problems || problems.length === 0)
        {
            return res.status(404).json({msg:"No problems found"});
        }
        return res.status(200).json({msg:"Problems fetched successfully",problems});
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({msg:"Error in getting problem",success:false,error:error.message});
    }
}
module.exports = {
    createPatientProblem,
    getPatientProblem
}