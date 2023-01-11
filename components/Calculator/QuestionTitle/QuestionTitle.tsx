import { useValuationStore } from 'lib/shared-domain/questionnaire/store';
import styles from './QuestionTitle.module.scss';

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
      <p>{description}</p>
    </div>
  );
};

export default QuestionTitle;
