import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useValuationStore } from '../../store';
import { animationVariants } from '../animationVariants';

export const QuestionAnimation: React.FC = ({ children }) => {
  const { isFadingOut } = useValuationStore();

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={animationVariants}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
