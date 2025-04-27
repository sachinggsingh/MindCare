import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Trophy,
  Star,
  Sparkles,
  RefreshCw,
  Home
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FaServicestack } from 'react-icons/fa';

const confettiColors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
  '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'
];

const Completion = () => {
  const [confettiPieces, setConfettiPieces] = useState([]);
  const navigate = useNavigate();

  // Create confetti piece
  const createConfettiPiece = (id) => ({
    id,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 360,
    size: Math.random() * 10 + 5,
    speed: Math.random() * 2 + 1
  });

  useEffect(() => {
    const initialPieces = Array.from({ length: 80 }).map((_, i) =>
      createConfettiPiece(i)
    );
    setConfettiPieces(initialPieces);

    const fallInterval = setInterval(() => {
      setConfettiPieces((prev) =>
        prev.map((piece) => {
          const newY = piece.y + piece.speed;
          return {
            ...piece,
            y: newY > window.innerHeight ? -50 : newY,
            x: piece.x + Math.sin(Date.now() / 1000 + piece.id) * 0.5
          };
        })
      );
    }, 30); // ~33 FPS

    return () => clearInterval(fallInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-2 px-4 relative overflow-hidden">
      {/* Confetti falling in the background */}
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute rounded-full z-0"
          style={{
            backgroundColor: piece.color,
            width: piece.size,
            height: piece.size,
            left: piece.x,
            top: piece.y,
            transform: `rotate(${piece.rotation}deg)`,
            transition: 'top 0.03s linear, left 0.03s linear'
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto relative z-10"
      >
        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          {/* Trophy Icon */}
          <motion.div
            className="flex justify-center pt-6 pb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <div className="relative">
              <Trophy className="w-24 h-24 text-yellow-500" />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
                className="absolute -top-2 -right-2"
              >
                <Star className="w-8 h-8 text-yellow-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            className="text-center px-4 pb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Congratulations! 🎉
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              You've successfully completed all your tasks!
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="bg-gray-50 py-8 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="grid grid-cols-3 gap-4 text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 shadow-sm"
              >
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">
                  All Tasks
                </div>
                <div className="text-sm text-gray-500">Completed</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 shadow-sm"
              >
                <Sparkles className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">100%</div>
                <div className="text-sm text-gray-500">Success Rate</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-2 shadow-sm"
              >
                <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">1</div>
                <div className="text-sm text-gray-500">Achievement</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Progress Circle */}
          <motion.div
            className="py-4 flex justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex justify-center gap-4 pb-8 px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>navigate('/')} 
              className=" cursor-pointer flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
            >
              <Home className="w-5 h-5" />
              Go tot home
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>navigate('/services')}
              className="cursor-pointer flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition-colors"
            >
              <FaServicestack className="w-5 h-5" />
              Go to services
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Motivational Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-8 text-center px-4"
        >
          <p className="text-gray-600 italic">
            "Success is the sum of small efforts, repeated day in and day out."
          </p>
          <p className="text-gray-500 text-sm mt-2">- Robert Collier</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Completion;
