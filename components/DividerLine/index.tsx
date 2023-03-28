import styles from './DividerLine.module.scss';
import { Container } from 'components/Layout';
export const DividerLine: React.FC<any> = () => (
  <Container>
    <div className={styles.dividerLine} />
  </Container>
);
