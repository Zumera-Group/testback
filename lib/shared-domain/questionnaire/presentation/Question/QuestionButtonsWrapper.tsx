import { Container } from 'components/Layout';
import styles from './QuestionButtonsWrapper.module.scss';

export const QuestionButtonsWrapper = ({ children, className }: { children: any; className?: string }) => {
  return (
    <div
      className={styles.questionButtonsWrapper}
    >
      <Container classes={className}>
        {children}
      </Container>
    </div>
  );
}

export default QuestionButtonsWrapper;
