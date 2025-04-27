import { motion } from "framer-motion";
import { FaHeart, FaBrain, FaComments, FaUsers } from "react-icons/fa";

const features = [
  { icon: <FaHeart size={30} />, title: "Personalized Care", description: "Tailored mental health resources to fit your needs." },
  { icon: <FaBrain size={30} />, title: "Expert Guidance", description: "Access professional advice from certified therapists." },
  { icon: <FaComments size={30} />, title: "24/7 Support", description: "Connect with support groups anytime, anywhere." },
  { icon: <FaUsers size={30} />, title: "Community Support", description: "Join a community that understands and supports you." },
];

const Feature = () => {
  return (
    <motion.div 
      className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {features.map((feature, index) => (
        <motion.div 
          key={index} 
          className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-blue-500 mb-4">{feature.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Feature;
