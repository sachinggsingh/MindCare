import React from 'react';
import { motion } from 'framer-motion';
import About from '../components/About';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import Feature from '../components/Feature';
import ServicesWeOffer from '../components/ServicesWeOffer';
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const Home = () => {
  return (
    <>
      <div className='min-h-screen'>
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <HeroSection />
        </motion.div>

        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <Feature />
        </motion.div>

        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <ServicesWeOffer />
        </motion.div>

        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
        >
          <About />
        </motion.div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
