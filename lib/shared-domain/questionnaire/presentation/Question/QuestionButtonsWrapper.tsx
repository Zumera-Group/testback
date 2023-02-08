import { Container } from 'components/Layout';
import styles from './QuestionButtonsWrapper.module.scss';

export const QuestionButtonsWrapper = ({ children }: { children: any }) => {
  return (
    <div className={styles.questionButtonsWrapper}>
      <Container>
        {children}
      </Container>
    </div>
  );
}

export default QuestionButtonsWrapper;
