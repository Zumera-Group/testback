import { Btn } from 'components/Buttons/Button';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';

import { motion, AnimatePresence } from 'framer-motion';
import { FlexCol } from 'components/Layout/Flex/Flex';
import { getTranslateByScope } from 'translation/i18n';
import { useValuationStore } from '../../store';

const t = getTranslateByScope('question');

const animationVariants = {
  initial: { y: 100, opacity: 0 },
  in: { y: 0, opacity: 1 },
  exit: { y: -100, opacity: 0 },
};

export const QuestionButtons: React.FC<{
  onNextQuestion: () => void;
  onFinishQuestionnaire?: () => void;
  firstButtonText?: string;
  secondButtonText?: string;
  isRequired: boolean;
  isAnswered: boolean;
}> = ({
  onNextQuestion,
  firstButtonText,
  secondButtonText,
  onFinishQuestionnaire,
  isRequired,
  isAnswered,
}) => {
  const { isFirstQuestion, isFadingOut } = useValuationStore();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          layout
          transition={{ delay: 0.4, duration: 0.3 }}
          initial="initial"
          animate="in"
          exit="exit"
          variants={animationVariants}
          style={{ width: '100%' }}
        >
          <FlexCol mt={2} mb={2} alignItems="center">
            {onFinishQuestionnaire && (
              <Btn
                aria-label="Finish questionnaire button"
                variant="primary"
                onClick={onFinishQuestionnaire}
                height="auto"
                whiteSpace="normal"
                style={{ wordWrap: 'break-word' }}
                minW={{ base: '100%', lg: 40 }}
              >
                {secondButtonText}
              </Btn>
            )}
            <Btn
              mt={2}
              aria-label="Go to next question button"
              disabled={isRequired && !isAnswered}
              mb={isMobile ? 1 : 0}
              minW={{ base: '100%', lg: 40 }}
              variant={onFinishQuestionnaire ? 'transparent' : 'primary'}
              onClick={onNextQuestion}
              height="auto"
              whiteSpace="normal"
              style={{ wordWrap: 'break-word' }}
            >
              {firstButtonText || t('nextBtn')}
            </Btn>
            {!isFirstQuestion() && !isRequired && !onFinishQuestionnaire && (
              <Btn
                aria-label="Skip button"
                mt={isMobile ? 0 : 3}
                variant="transparent"
                onClick={onNextQuestion}
              >
                {t('skipBtn')}
              </Btn>
            )}
          </FlexCol>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
