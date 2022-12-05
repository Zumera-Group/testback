import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useValuationStore } from '../../store';
import { useWindowDimensions } from 'lib/hooks/useWindowDimensions';
import { Box } from 'components/Layout/Flex/Flex';
import { useBreakpointValue } from '@chakra-ui/react';

export const variants = {
  initial: {
    y: 100,
    opacity: 0,
  },
  in: {
    y: 0,
    opacity: 1,
  },
  out: {
    y: -100,
    opacity: 0,
  },
};

export const transition = {
  duration: 0.3,
  delay: 0.3,
};

const WEBKIT_SCROLL = `::-webkit-scrollbar {
  background: transparent;
}`;

export const QuestionAnimation: React.FC = ({ children }) => {
  const { isFadingOut, isFirstQuestion } = useValuationStore();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const { windowHeight } = useWindowDimensions();

  const maxH = isFirstQuestion ? windowHeight - 450 : windowHeight - 290;

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          layout
          style={{ width: '100%' }}
          initial="initial"
          animate="in"
          exit="out"
          variants={variants}
          transition={transition}
        >
          <Box mx="auto" w="100%">
            {children}
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
