import styles from './AnswerLabel.module.scss';

interface Props {
  answer: string;
}

export const AnswerLabel: React.FC<Props> = ({ answer }) => {
  if (!answer) return null;

  return (
    <output
      name="answer"
      className={styles.answerLabel}>
        {answer}
    </output>
  );
};

export default AnswerLabel;