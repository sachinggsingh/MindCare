import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader, ChevronLeft, ChevronRight, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { fetchTask } from '../redux/client/fetchTaskSlice';
import { useNavigate } from 'react-router-dom';

const cardVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    rotateY: 45
  }),
  center: {
    x: 0,
    opacity: 1,
    rotateY: 0,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
      rotateY: { duration: 0.4 }
    }
  },
  exit: (direction) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    rotateY: -45,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
      rotateY: { duration: 0.4 }
    }
  })
};

const TaskViewer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { problemId } = useParams();
  const { tasks, loading, error } = useSelector(state => state.fetchTask);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (problemId) {
      dispatch(fetchTask(problemId));
    }
  }, [dispatch, problemId]);

  const handleNext = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setDirection(1);
      setCurrentTaskIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentTaskIndex > 0) {
      setDirection(-1);
      setCurrentTaskIndex(prev => prev - 1);
    }
  };

  const difficultyColors = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    hard: "bg-red-100 text-red-800"
  };

  const priorityColors = {
    1: "bg-red-100 text-red-800",
    2: "bg-yellow-100 text-yellow-800",
    3: "bg-green-100 text-green-800"
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center min-h-screen"
      >
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            rotate: { duration: 1, repeat: Infinity, ease: "linear" },
            scale: { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Loader className="w-10 h-10 text-blue-500" />
        </motion.div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center items-center min-h-screen"
      >
        <div className="bg-red-100 p-4 rounded-lg text-red-700 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      </motion.div>
    );
  }


  if (!tasks || tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex justify-center items-center min-h-screen"
      >
        <div className="bg-blue-100 p-4 rounded-lg text-blue-700">
          No tasks available for this problem
        </div>
      </motion.div>
    );
  }

  const currentTask = tasks[currentTaskIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-2   px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <motion.div
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6">
            <div className="mb-2">
              <motion.h2
                className="text-2xl font-bold text-gray-800 mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Task {currentTaskIndex + 1} of {tasks.length}
              </motion.h2>
              <div className="relative w-full bg-gray-200 rounded-full h-2.5">
                <motion.div
                  className="bg-blue-600 h-2.5 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((currentTaskIndex + 1) / tasks.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentTaskIndex}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-6"
              >
                <motion.div
                  className="bg-gradient-to-r from-white to-gray-50 p-6 rounded-xl shadow-sm"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    {currentTask.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{currentTask.description}</p>
                </motion.div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    className="p-4 rounded-xl bg-white shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <span className="text-sm text-gray-500 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Difficulty
                    </span>
                    <p className={`font-medium mt-1 px-3 py-1 rounded-full inline-block ${difficultyColors[currentTask.difficulty]}`}>
                      {currentTask.difficulty.charAt(0).toUpperCase() + currentTask.difficulty.slice(1)}
                    </p>
                  </motion.div>
                  <motion.div
                    className="p-4 rounded-xl bg-white shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <span className="text-sm text-gray-500 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Priority
                    </span>
                    <p className={`font-medium mt-1 px-3 py-1 rounded-full inline-block ${priorityColors[currentTask.priority]}`}>
                      Priority {currentTask.priority}
                    </p>
                  </motion.div>
                </div>

                {currentTask.problem && (
                  <motion.div
                    className="bg-blue-50 p-6 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Related Problem
                    </h4>
                    <p className="text-blue-700">{currentTask.problem.description}</p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              <motion.button
                onClick={handlePrevious}
                disabled={currentTaskIndex === 0}
                whileHover={{ scale: currentTaskIndex === 0 ? 1 : 1.05 }}
                whileTap={{ scale: currentTaskIndex === 0 ? 1 : 0.95 }}
                className={`cursor-pointer px-6 py-3 rounded-lg flex items-center gap-2 ${currentTaskIndex === 0
                    ? 'bg-gray-200 text-gray-800 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-900 text-white shadow-lg'
                  }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </motion.button>
              {currentTaskIndex === tasks.length - 1 ? (
                <motion.button
                  onClick={() => { navigate('/completion') 
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer px-6 py-3 rounded-lg flex items-center gap-2 bg-green-500 hover:bg-green-900 text-white shadow-lg"
                >
                  Complete
                  <CheckCircle className="w-5 h-5" />
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer px-6 py-3 rounded-lg flex items-center gap-2 bg-blue-500 hover:bg-blue-900 text-white shadow-lg"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              )}
            </div>
          </div>

        </motion.div>
      </motion.div>
    </div>
  );
}

export default TaskViewer;