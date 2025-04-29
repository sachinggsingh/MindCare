import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/auth/authSlice";
import { Loader, } from "lucide-react";
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error: authError } = useSelector((state) => state.auth);

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {    
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await dispatch(loginUser(formData)).unwrap();
      navigate('/');
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };



  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-96 border border-red-200">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Login</h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-center font-medium">{error}</p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setError("")}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-all duration-300 font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
        <Loader className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-lg font-medium text-blue-600">Logging in...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-xl w-96 border border-blue-100"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
      >
        <motion.h2
          className="text-3xl font-bold mb-6 text-center text-gray-800"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Welcome Back
        </motion.h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 block">Email</label>
            <motion.input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-blue-50 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
              required
              whileFocus={{ scale: 1.01 }}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 block">Password</label>
              <a href="#" className="text-xs text-blue-600 hover:text-blue-800 transition-colors">Forgot Password?</a>
            </div>
            <motion.input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-blue-50 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
              required
              whileFocus={{ scale: 1.01 }}
            />
          </div>

          {(error || authError) && (
            <motion.div
              className="text-red-500 text-sm font-medium text-center p-2 bg-red-50 rounded-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error || authError}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg text-white font-medium shadow-md ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            whileHover={{ scale: loading ? 1 : 1.03 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </motion.button>
        </form>
        

        <div className="mt-8 text-center text-sm text-gray-600">
          <span>Don't have an account? </span>
          <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">Create account</Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;