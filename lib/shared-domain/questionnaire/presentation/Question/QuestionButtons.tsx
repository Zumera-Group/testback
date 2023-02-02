import { getTranslateByScope } from 'translation/i18n';
import { useValuationStore } from '../../store';
import { Button } from 'components/Button/Button';
import styles from './QuestionButtons.module.scss';

const t = getTranslateByScope('question');

export const QuestionButtons: React.FC<{
  onNextQuestion: () => void;
  onFinishQuestionnaire?: () => void;
  firstButtonText?: string;
  secondButtonText?: string;
  isRequired: boolean;
  isAnswered: boolean;
  stackMobile?: boolean;
}> = ({
  onNextQuestion,
  firstButtonText,
  secondButtonText,
  onFinishQuestionnaire,
  isRequired,
  isAnswered,
  stackMobile,
}) => {
  const { isFirstQuestion } = useValuationStore();

  return (
    <div className={[styles.buttonWrapper, stackMobile && styles.stack].join(' ')}>
      {onFinishQuestionnaire && (
        <Button
          aria-label="Finish questionnaire button"
          variant="primary"
          callBack={onFinishQuestionnaire}
          onDark
          hideIcon
          classes={styles.questionButton}
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
        classes={styles.questionButton}
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
          classes={styles.questionButton}
        >
          {t('skipBtn')}
        </Button>
      )}
    </div>
  );
};
