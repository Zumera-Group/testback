import { Box } from '@chakra-ui/react';
import { H } from 'components/Typography/H';
import { P } from 'components/Typography/P';
import { AnimatePresence, motion } from 'framer-motion';
import { useValuationStore } from 'lib/shared-domain/questionnaire/store';
import React from 'react';
import { fontSizes } from 'styles/foundations/fontStyles';

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
  const { isFadingOut } = useValuationStore();

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
          <Box mt={{ base: 5.5, lg: 0 }} maxWidth={700} mx="auto" pb={4}>
            <H
              as="h1"
              textAlign="center"
              variant="h1"
              fontSize={{ base: fontSizes.h2, lg: 'h1' }}
              lineHeight={{ base: '27px', lg: '39px' }}
            >
              {title}
            </H>
            {description && (
              <P whiteSpace="pre-wrap" textAlign="center" pt={3}>
                {description}
              </P>
            )}
          </Box>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
