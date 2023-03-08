import { useValuationStore } from 'lib/shared-domain/questionnaire/store';
import styles from './QuestionTitle.module.scss';
import { Tooltip } from 'components/Icons/Tooltip';

interface Props {
  title?: string;
  description?: string;
}

const QuestionTitle: React.FC<Props> = ({ title, description }) => {
  const { questionnaire, mainStep } = useValuationStore();
  const currentCategory =
    questionnaire?.questionsByCategory?.[mainStep]?.categoryName ?? '';

  const isDesc = description?.length > 1 ? true : false;

  return (
    <div className={styles.questionTitleWrapper}>
      <span className={styles.category}>{currentCategory}</span>
      <h3 className={styles.title}>{title}</h3>
      {isDesc && (
        <div className={styles.tooltipWrapper}>
          <span className={styles.infoPrompt}>
            Why do you need this information?
          </span>
          <Tooltip color="#ffffff" className={styles.tooltipIcon} />
          <div className={styles.tooltipText}>{description}</div>
        </div>
      )}
    </div>
  );
};

export default QuestionTitle;
