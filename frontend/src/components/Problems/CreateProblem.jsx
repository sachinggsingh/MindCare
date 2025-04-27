import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Loader } from 'lucide-react';
import { createPatient } from '../../redux/client/patientSlice';

const CreateProblem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, } = useSelector(state => state.patients);

  const [formData, setFormData] = useState({
    title: '' ,
    description: '' 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createPatient(formData)).unwrap();
      
        navigate('/');
        console.log('Problem created successfully',formData);

    } catch (err) {
      console.error('Failed to create problem:', err);
      return err;
    }
  };
  if(loading)
  {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }
  if(error)
  {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-6"
    >
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
          className="relative bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-400/20 backdrop-blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-400/20 to-pink-400/20 backdrop-blur-3xl"></div>
          
          <div className="relative p-8 md:p-12 z-10">
            <div className="flex justify-center mb-8">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-medium shadow-lg"
              >
                <Sparkles size={18} className="text-blue-100" />
                <span>Report an Issue</span>
              </motion.div>
            </div>

            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Describe Your Problem
            </motion.h1>
            
            <motion.p 
              className="text-center text-gray-500 mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              We'll help you find the perfect solution
            </motion.p>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg"
              >
                {error}
              </motion.div>
            )}

            <motion.form 
              onSubmit={handleSubmit}
              className="space-y-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {/* Name Field */}
              <div className="group relative">
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="peer w-full h-14 px-5 pt-6 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                  placeholder=" "
                />
                <label
                  htmlFor="title"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-6 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-indigo-600"
                >
                  Problem Title
                </label>
              </div>

              {/* Description Field */}
              <div className="group relative">
                <textarea
                  name="description"
                  id="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="peer w-full px-5 pt-8 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                  placeholder=" "
                ></textarea>
                <label
                  htmlFor="description"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-6 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-indigo-600"
                >
                  Detailed Description
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={loading ? {} : { scale: 1.02, translateY: -2 }}
                whileTap={loading ? {} : { scale: 0.98 }}
                className={`w-full cursor-pointer py-4 px-6 rounded-xl font-medium text-white flex items-center justify-center gap-2 shadow-lg ${
                  loading
                    ? 'bg-indigo-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800'
                } transition-all duration-300`}
              >
                {loading ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Problem</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
        
        <motion.p 
          className="text-center text-gray-500 mt-6 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.8 }}
        >
          Our team will review your submission within 24 hours
        </motion.p>
      </div>
    </motion.div>
  );
};

export default CreateProblem;



