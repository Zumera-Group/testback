import { Btn } from 'components/Buttons/Button';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';

import { motion, AnimatePresence } from 'framer-motion';
import { FlexCol } from 'components/Layout/Flex/Flex';
import { getTranslateByScope } from 'translation/i18n';
import { useValuationStore } from '../../store';
import { Button } from 'components/Button/Button';

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

  console.log(onFinishQuestionnaire);
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
              <Button
                aria-label="Finish questionnaire button"
                variant="primary"
                callBack={onFinishQuestionnaire}
                onDark
                hideIcon
              >
                {secondButtonText}
              </Button>
            )}

            <Button
              aria-label="Go to next question button"
              disabled={isRequired && !isAnswered}
              variant={'primary'}
              callBack={onNextQuestion}
              onDark={onFinishQuestionnaire ? false : true}
            >
              {firstButtonText || t('nextBtn')}
            </Button>

            {!isFirstQuestion() && !isRequired && !onFinishQuestionnaire && (
              <Button
                aria-label="Skip button"
                variant="secondary"
                onDark
                hideIcon
                callBack={onNextQuestion}
                type={'button'}
              >
                {t('skipBtn')}
              </Button>
            )}
          </FlexCol>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
