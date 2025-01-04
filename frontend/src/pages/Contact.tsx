import React from 'react';
import ContactForm from '../Components/ContactForm';
import { motion } from 'framer-motion';

interface ContactProps {
  darkMode: boolean;
}

const Contact: React.FC<ContactProps> = ({ darkMode }) => {
  const pageVariants = {
    initial: { opacity: 0.5, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        type: 'spring', 
        damping: 45,
        stiffness: 260
      } 
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="pt-20"
    >
      <div className="max-w-4xl max-h-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContactForm darkMode={darkMode} />
      </div>
    </motion.div>
  );
};

export default Contact;
