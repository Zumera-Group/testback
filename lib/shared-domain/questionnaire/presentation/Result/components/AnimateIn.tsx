import React from 'react';
import { motion } from 'framer-motion';

const animationVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
};


export const AnimateIn: React.FC = ({ children }) => {
  return (
    <motion.div
      style={{ height: '100%' }}
      transition={{ delay: 0.2, duration: 0.4 }}
      initial="initial"
      animate="in"
      variants={animationVariants}
    >
      {children}
    </motion.div>
  );
};
