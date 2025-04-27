const Problem = require('../models/problem');
const mongoose = require('mongoose');
const User = require('../models/user');

const createProblem = async(req,res)=>
{
  try
  {
    const {name,description,symptoms,solutions} = req.body
    // const userId = req.user._id
    if(!name || !description || !symptoms || !solutions)
    {
      return res.status(400).json({msg:"Please enter all fields"})
    }
    if(!Array.isArray(symptoms) || !Array.isArray(solutions))
    {
      return res.status(400).json({msg:"Please enter valid symptoms and solutions"})
    }
    if(symptoms.length === 0 || solutions.length === 0)
    {
      return res.status(400).json({msg:"symptoms and solutions cannot be empty"})
    }
    
    const problemExist = await Problem.findOne({name:name})
    if(problemExist) return res.status(400).json({msg:"Problem already exists"})
      
    const newProblem = await Problem.create({
      name,
      description,
      symptoms,
      solutions,
      // userId
    })

    const populateProblem = await Problem.findById(newProblem._id)
    return res.status(200).json({msg:"Problem created successfully",
      problem :{
        _id:populateProblem._id,
        name:populateProblem.name,
        description:populateProblem.description,
        symptoms:populateProblem.symptoms,
        solutions:populateProblem.solutions,
        // user:populateProblem.userId.username,
        // userId:populateProblem.userId.email,
      }
    })
  }
  catch(error)
  {
    console.log(error)
    return res.status(500).json({msg:"Error in creating problem",success:false,error:error.message})
  }
}


const getAllProblems = async(req,res)=>
{
  try
  {
    const problems = await Problem.find().sort({createdAt:-1})
    if(!problems)
    {
      return res.status(404).json({msg:"No problems found"})
    }
    if(problems.length === 0)
    {
      return res.status(404).json({msg:"Add your problems found"})
    }
    return res.status(200).json({msg:"Problems fetched successfully",problems})
  }
  catch(error)
  {
    console.log(error)
    return res.status(500).json({msg:"Error in getting problems",success:false,error:error.message})
  }
}

const getProblemById = async(req,res)=>
{
  try
  {
    const problem = await Problem.findById(req.params.id)
    if(!problem)
    {
      return res.status(404).json({msg:"Problem not found"})
    }
    if(problem.length===0)
    {
      return res.status(404).json({msg:"Add your problems found"})
    }
    return res.status(200).json({msg:"Problem fetched successfully",problem})

  }
  catch(error)
  {
    console.log(error)
    return res.status(500).json({msg:"Error in getting problem",success:false,error:error.message})
  }
}

// const updateProblem = async(req,res)=>
// {
//   try
//   {
//     const {name,description,symptoms,solutions} = req.body
//     const problem = await Problem.findById(req.params.id)
//     if(!problem)
//     {
//       return res.status(404).json({msg:"Problem not found"})
//     }
//     problem.name = name || problem.name
//     problem.description = description || problem.description  
//     problem.symptoms = symptoms || problem.symptoms
//     problem.solutions = solutions || problem.solutions
//     await problem.save()
//     return res.status(200).json({msg:"Problem updated successfully",problem})
//   }
//   catch(error)
//   {
//     console.log(error)
//     return res.status(500).json({msg:"Error in updating problem",success:false,error:error.message})
//   }
// }

// const deleteProblem = async(req,res)=>
// {
//   try
//   {  
//     const problem = await Problem.findById(req.params.id)
//     if(!problem)
//     {
//       return res.status(404).json({msg:"Problem not found"})
//     }
//     await problem.remove()
//     return res.status(200).json({msg:"Problem deleted successfully"})
//   }
//   catch(error)
//   {
//     console.log(error)
//     return res.status(500).json({msg:"Error in deleting problem",success:false,error:error.message})
//   }
// }

module.exports = {createProblem,getAllProblems,getProblemById,}