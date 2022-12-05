import React from 'react';
import { motion } from 'framer-motion';

export const ZoomInAnimation: React.FC<{ delay?: number }> = ({
  children,
  delay,
}) => {
  const transition = {
    ease: 'easeInOut',
    duration: 2,
    delay,
  };

  return (
    <motion.div
      initial={{ transform: 'scale(0.96)' }}
      animate={{ transform: 'scale(1)' }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export const UpAnimation: React.FC<{ delay?: number }> = ({
  children,
  delay,
}) => {
  const transition = {
    ease: 'easeInOut',
    duration: 0.3,
    delay,
  };

  return <motion.div
      initial={{ y: 100 }}
      animate={{ y: [100, 50, -10, 0] }} 
      transition={transition} style={{ height: '100%'}}>{children}</motion.div>;
};
