import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaBrain, FaHandHoldingHeart, FaUsers, FaChartLine, FaCheckCircle, FaShieldAlt, FaClock, FaUserMd } from "react-icons/fa";

const stats = [
  { label: "Active Users", value: "10,000+", icon: FaUsers, color: "text-blue-500" },
  { label: "Success Rate", value: "92%", icon: FaChartLine, color: "text-green-500" },
  { label: "Expert Therapists", value: "50+", icon: FaUserMd, color: "text-purple-500" },
  { label: "Support Hours", value: "24/7", icon: FaClock, color: "text-indigo-500" }
];

const features = [
  {
    title: "Evidence-Based Approach",
    description: "Our methods are backed by scientific research and proven clinical practices.",
    icon: FaBrain,
    color: "text-blue-500"
  },
  {
    title: "Personalized Care",
    description: "Tailored mental health solutions that adapt to your unique needs and progress.",
    icon: FaHandHoldingHeart,
    color: "text-green-500"
  },
  {
    title: "Continuous Support",
    description: "Round-the-clock access to resources and emergency support when you need it most.",
    icon: FaClock,
    color: "text-purple-500"
  },
  {
    title: "Privacy First",
    description: "Your mental health journey is protected with enterprise-grade security and privacy.",
    icon: FaShieldAlt,
    color: "text-indigo-500"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Anxiety Management Patient",
    feedback: "MindCare's personalized approach helped me overcome my anxiety. The 24/7 support made all the difference.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=180&q=80"
  },
  {
    name: "Dr. Michael Chen",
    role: "Clinical Psychologist",
    feedback: "As a mental health professional, I'm impressed by MindCare's evidence-based approach and comprehensive support system.",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=180&q=80"
  },
  {
    name: "Emily Rodriguez",
    role: "Depression Recovery Journey",
    feedback: "The continuous support and community aspect of MindCare played a crucial role in my recovery journey.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=180&q=80"
  }
];

// Animation variants
const fadeInUp = {
  hidden: { y: 60, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const ScaleInView = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

const FadeInView = ({ children, direction = null, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const getInitialPosition = () => {
    switch(direction) {
      case 'left': return { x: -50, opacity: 0 };
      case 'right': return { x: 50, opacity: 0 };
      case 'up': return { y: 50, opacity: 0 };
      case 'down': return { y: -50, opacity: 0 };
      default: return { opacity: 0 };
    }
  };
  
  const getFinalPosition = () => {
    switch(direction) {
      case 'left': 
      case 'right': return { x: 0, opacity: 1 };
      case 'up':
      case 'down': return { y: 0, opacity: 1 };
      default: return { opacity: 1 };
    }
  };
  
  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isInView ? getFinalPosition() : getInitialPosition()}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
};

const AboutUs = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  
  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section 
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <FadeInView direction="up">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">About MindCare</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transforming mental health support through innovative technology and compassionate care. 
              We're dedicated to making quality mental healthcare accessible to everyone.
            </p>
          </div>
        </FadeInView>

        {/* Stats Section */}
        <motion.div 
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          variants={staggerContainer}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white p-6 rounded-xl shadow-lg text-center"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-4 ${stat.color}`} />
              <h4 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h4>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission and Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <FadeInView direction="left" delay={0.2}>
            <div className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                At MindCare, we are dedicated to providing accessible, reliable, and personalized mental health resources. 
                Our expert-backed solutions help individuals navigate their mental health journey with confidence and dignity.
              </p>
              <ul className="space-y-3">
                {['Evidence-based care', 'Personalized approach', 'Continuous support', 'Affordable access'].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInView>

          <FadeInView direction="right" delay={0.4}>
            <div className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                We envision a world where quality mental healthcare is accessible to everyone, everywhere. 
                Through technology and compassion, we're breaking down barriers and stigmas surrounding mental health.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {['Innovation', 'Empathy', 'Excellence', 'Integrity'].map((value, index) => (
                  <div key={index} className="bg-blue-50 p-3 rounded-lg text-center text-blue-600 font-semibold">
                    {value}
                  </div>
                ))}
              </div>
            </div>
          </FadeInView>
        </div>

        {/* Features Grid */}
        <FadeInView direction="up">
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose MindCare?</h3>
            
            <motion.div 
              ref={featuresRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="bg-white p-6 rounded-xl shadow-lg"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <feature.icon className={`w-10 h-10 ${feature.color} mb-4`} />
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </FadeInView>

        {/* Testimonials */}
        <ScaleInView delay={0.2}>
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-20">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Community Says</h3>
            <motion.div 
              key={testimonialIndex}
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={testimonials[testimonialIndex].image} 
                alt={testimonials[testimonialIndex].name}
                className="w-24 h-24 rounded-full object-cover mb-6 border-4 border-blue-100"
              />
              <p className="text-gray-600 text-lg italic text-center mb-6 max-w-2xl">
                "{testimonials[testimonialIndex].feedback}"
              </p>
              <p className="font-bold text-gray-900 text-xl">{testimonials[testimonialIndex].name}</p>
              <p className="text-blue-600">{testimonials[testimonialIndex].role}</p>
            </motion.div>
          </div>
        </ScaleInView>

        {/* CTA Section */}
        <FadeInView direction="up" delay={0.3}>
          <div className="text-center bg-blue-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands who have already transformed their lives with MindCare's 
              comprehensive mental health support system.
            </p>
            <motion.button
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
            </motion.button>
          </div>
        </FadeInView>
      </div>
    </motion.section>
  );
};

export default AboutUs;