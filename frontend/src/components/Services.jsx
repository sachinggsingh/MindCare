import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaBrain, FaHeartbeat, FaMoon, FaUsers, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchProblems } from '../redux/client/fetchProblemSlice';
import { Link } from "react-router-dom";

const iconMap = {
  'brain': FaBrain,
  'heartbeat': FaHeartbeat,
  'moon': FaMoon,
  'users': FaUsers
};

const Services = () => {
  const dispatch = useDispatch();
  const { items: services, loading, error } = useSelector(state => state.getServiceProblems);
  
  useEffect(() => {
    dispatch(fetchProblems());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [20, 0] }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-16 h-16 border-4 border-blue-400 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <div className="text-blue-600 text-xl font-medium">Loading services...</div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center">
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-lg max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-2 bg-red-100 rounded-full">
            <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-red-600 text-xl font-medium text-center">Error loading services</div>
          <p className="mt-2 text-gray-600 text-center">{error}</p>
          <button 
            onClick={() => dispatch(fetchProblems())}
            className="w-full mt-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 font-medium rounded-lg transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const getIconComponent = (iconName) => {
    const IconComponent = iconMap[iconName.toLowerCase()] || FaBrain;
    return <IconComponent size={50} className="text-blue-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-7xl mx-auto px-12 py-6">
        
        <motion.div
          className="flex flex-col items-center text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            Professional Care
          </span>
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Mental Health <span className="text-blue-600">Services</span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl">
            We provide evidence-based solutions tailored to support your mental well-being
            and help you thrive in every aspect of your life.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {services && services.length > 0 ? (
            services.map((service) => (
              <motion.div
                key={service._id}
                className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 flex flex-col h-full"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-100 rounded-xl mr-4">
                    {service.icon ? getIconComponent(service.icon) : <FaBrain size={30} className="text-blue-600" />}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{service.name}</h3>
                </div>

                <p className="text-gray-600 text-md mb-6 flex-grow">{service.description}</p>

                {service.symptoms?.length > 0 && (
                  <div className="mb-6 w-full">
                    <h4 className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                      <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-2">
                        <span className="text-red-500">🩺</span>
                      </span>
                      Symptoms
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {service.symptoms.slice(0, 4).map((symptom, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                        >
                          <span>{symptom}</span>
                        </div>
                      ))}
                      {service.symptoms.length > 4 && (
                        <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                          <span>+{service.symptoms.length - 4} more</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {service.solutions?.length > 0 && (
                  <div className="w-full mb-6">
                    <h4 className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                      <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                        <span className="text-green-500">💡</span>
                      </span>
                      Solutions
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {service.solutions.slice(0, 4).map((solution, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm"
                        >
                          <span>{solution}</span>
                        </div>
                      ))}
                      {service.solutions.length > 4 && (
                        <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                          <span>+{service.solutions.length - 4} more</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <Link
                  to={`/services/${service._id}`}
                  className="mt-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-blue-200 group"
                >
                  <span>Learn more</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="col-span-2 bg-white p-8 rounded-xl shadow-md text-center"
              variants={itemVariants}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">No Services Available</h3>
                <p className="text-gray-500">Check back later for new mental health services.</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Services;