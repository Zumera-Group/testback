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
  return (
    <div className={styles.questionTitleWrapper}>
      <span className={styles.category}>{currentCategory}</span>
      <h3 className={styles.title}>{title}</h3>
      {/* {description && <p>{description} TEST</p>} */}
      <div className={styles.tooltip}>
        Why do you need this information?{' '}
        <Tooltip color="#ffffff" className={styles.tooltipIcon} />
        <p className={styles.tooltipText}>sse</p>
      </div>
    </div>
  );
};

export default QuestionTitle;
