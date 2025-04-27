import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

// your original mental health services data
const mentalHealthServices = [
  {
    title: "Online Therapy Sessions",
    description:
      "Connect with licensed therapists for private one-on-one sessions through video, audio, or chat.",
    icon: "🧑‍⚕️",
    // image:therapy,
  },
  {
    title: "Mental Health Assessment",
    description:
      "Take clinically-backed quizzes to evaluate symptoms of anxiety, depression, and stress.",
    icon: "📝",
    // image:Mental,
  },
  {
    title: "Meditation & Breathing Exercises",
    description:
      "Access guided meditations and breathing techniques to relax and reduce stress.",
    icon: "🧘‍♂️",
    // image:Medication
  },
  {
    title: "Self-Help Resources",
    description:
      "Explore curated books, videos, and tools designed to help you improve your mental balance.",
    icon: "🛠️",
    // image:Self,
  },
  {
    title: "Community Forums",
    description:
      "Join a safe space to share experiences, ask questions, and support others.",
    icon: "👥",
    // image:forum,
  },
  {
    title: "24/7 Support Chat",
    description:
      "Talk to trained volunteers anytime you need emotional support.",
    icon: "💬",
    // image:chat,
  },
];

const ServicesWeOffer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="p-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.h1 
        className="text-5xl font-bold text-center mb-10"
        variants={cardVariants}
      >
        <i>Our Services</i>
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentalHealthServices.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            variants={cardVariants}
            whileHover={{ 
              scale: 1.03,
              transition: { duration: 0.3 }
            }}
          >
            <div className="p-5 flex-col justify-between h-50 text-center">
              <motion.div 
                className="text-3xl"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {service.icon}
              </motion.div>
              <h2 className="text-xl font-semibold mt-3">{service.title}</h2>
              <p className="text-gray-600 text-sm mt-2">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="text-center mt-10"
        variants={cardVariants}
      >
        <Link to="/services">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex cursor-pointer items-center gap-2 text-xl px-5 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 mx-auto"
          >
            View All Services <FaExternalLinkAlt />
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default ServicesWeOffer;