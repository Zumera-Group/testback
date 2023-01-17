import QuestionTitle from 'components/Calculator/QuestionTitle/QuestionTitle';
import { AnimatePresence, motion } from 'framer-motion';
import { useValuationStore } from 'lib/shared-domain/questionnaire/store';
import React from 'react';

interface Props {
  title: string;
  description?: string;
}

const animationVariants = {
  initial: { y: 100, opacity: 0 },
  in: { y: 0, opacity: 1 },
  exit: { y: -100, opacity: 0 },
};

export const QuestionText: React.FC<Props> = ({
  title,
  description,
  children,
}): JSX.Element => {
  const { isFadingOut, questionnaire, mainStep } = useValuationStore();

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          layout
          transition={{ delay: 0.2, duration: 0.3 }}
          initial="initial"
          animate="in"
          exit="exit"
          variants={animationVariants}
        >
          <QuestionTitle title={title} description={description} />

          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
