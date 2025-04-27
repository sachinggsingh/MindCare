import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchProblems } from '../redux/client/fetchProblemSlice';
import {
  FaBrain, FaArrowLeft, FaCheckCircle,
  FaExclamationCircle, FaUserMd, FaCalendarAlt, FaClock
} from 'react-icons/fa';

const DetailServices = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: services, loading, error } = useSelector(state => state.getServiceProblems);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    dispatch(fetchProblems());
  }, [dispatch]);

  const service = services?.find(s => s._id === id);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin mb-4"></div>
          <div className="text-blue-600 text-xl font-medium">Loading service details...</div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaExclamationCircle className="text-red-500 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/services')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
          >
            Back to Services
          </button>
        </motion.div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md"
        >
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaExclamationCircle className="text-yellow-500 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Service Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find the service you're looking for.</p>
          <button
            onClick={() => navigate('/services')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
          >
            Browse All Services
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white  "
    >
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/70 border-b border-gray-200 mb-8">
          <div className="flex items-center justify-between h-16 px-4">
            <Link
              to="/services"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium"><b>Back to Services</b></span>
            </Link>
          </div>
        </header>
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-400 h-36 md:h-44">
            <div className="absolute inset-0 bg-blue-800 opacity-10 pattern-dots"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                <FaBrain className="text-blue-500 text-4xl" />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <motion.div variants={itemVariants} className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {service.name}
              </h1>
              <p className="text-gray-600 text-xl max-w-3xl mx-auto">
                {service.description}
              </p>
            </motion.div>

            {/* Tabs Navigation */}
            <motion.div variants={itemVariants} className="flex justify-center mb-8 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('overview')}
                className={` cursor-pointer px-6 py-3 font-medium ${activeTab === 'overview'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Overview
              </button>
              {service.symptoms?.length > 0 && (
                <button
                  onClick={() => setActiveTab('symptoms')}
                  className={`  cursor-pointer px-6 py-3 font-medium ${activeTab === 'symptoms'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  Symptoms
                </button>
              )}
              {service.solutions?.length > 0 && (
                <button
                  onClick={() => setActiveTab('solutions')}
                  className={` cursor-pointer px-6 py-3 font-medium ${activeTab === 'solutions'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  Solutions
                </button>
              )}
            </motion.div>

            {/* Tab Content */}
            <motion.div variants={itemVariants}>
              {activeTab === 'overview' && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                      <FaUserMd className="mr-2" /> Our Approach
                    </h3>
                    <p className="text-gray-700">
                      Our team of specialized professionals uses evidence-based techniques
                      to address {service.name.toLowerCase()} with personalized care plans
                      that consider your unique circumstances and needs.
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="bg-white p-3 rounded-lg shadow-sm flex items-center">
                        <FaCalendarAlt className="text-blue-500 mr-2" />
                        <span className="text-sm text-gray-700">Weekly Sessions</span>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm flex items-center">
                        <FaClock className="text-blue-500 mr-2" />
                        <span className="text-sm text-gray-700">45-60 Minutes</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                    <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                      <FaCheckCircle className="mr-2" /> Benefits
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span className="text-gray-700">Personalized treatment plans</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span className="text-gray-700">Evidence-based therapeutic approaches</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span className="text-gray-700">Ongoing progress assessment</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span className="text-gray-700">Flexible appointment scheduling</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'symptoms' && service.symptoms?.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold text-blue-600 mb-6 flex items-center">
                    <FaExclamationCircle className="mr-2 text-blue-500" />
                    Common Symptoms
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.symptoms.map((symptom, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 shadow-sm hover:shadow transition-shadow"
                      >
                        <span className="text-blue-500 mr-3 font-bold">{index + 1}.</span>
                        <span className="text-gray-700">{symptom}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-8 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <p className="text-yellow-700 text-sm italic">
                      If you're experiencing multiple symptoms listed above for more than two weeks,
                      we recommend scheduling a consultation with one of our specialists.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'solutions' && service.solutions?.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold text-green-600 mb-6 flex items-center">
                    <FaCheckCircle className="mr-2 text-green-500" />
                    Treatment Approaches
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.solutions.map((solution, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start bg-green-50 p-4 rounded-lg border-l-4 border-green-400 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <span className="text-green-500 mr-3 font-bold">{index + 1}.</span>
                        <div>
                          <span className="text-gray-700">{solution}</span>
                          <p className="text-gray-500 text-sm mt-1">
                            Our specialists are trained in this approach and will tailor it to your specific needs.
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* CTA Section */}
            <motion.div
              variants={itemVariants}
              className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Ready to Begin Your Healing Journey?</h3>
                  <p className="text-gray-600">
                    Professional support tailored to your needs for just ${service.price || '29.99'} per session
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/tasks/${service._id}`)}
                  className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  Start Your Journey <span className="ml-2">→</span>
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-500 font-medium">JD</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">John D.</h4>
                  <div className="flex text-yellow-400">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The personalized approach to my treatment made all the difference.
                I'm now equipped with tools to manage my symptoms effectively."
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-500 font-medium">SM</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Sarah M.</h4>
                  <div className="flex text-yellow-400">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "After just a few sessions, I noticed significant improvements. The therapists
                are knowledgeable and truly care about your progress."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DetailServices;
