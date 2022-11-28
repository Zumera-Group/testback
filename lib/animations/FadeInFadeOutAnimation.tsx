import React from 'react';
import { motion } from 'framer-motion';

export const FadeInFadeOutAnimation: React.FC<{ delay: number }> = ({
  children,
  delay,
}) => {
  const bubbleTransition = {
    ease: 'easeInOut',
    duration: 2,
    repeat: Infinity,
    delay,
  };

  return (
    <motion.div
      animate={{ opacity: [0, 0.5, 0] }}
      transition={bubbleTransition}
    >
      {children}
    </motion.div>
  );
};
