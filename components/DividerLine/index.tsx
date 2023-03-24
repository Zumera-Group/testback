import styles from './DividerLine.module.scss';
import { Container, Section } from 'components/Layout';
export const DividerLine: React.FC<any> = () => (
  <Container>
    <div className={styles.dividerLine} />
  </Container>
);
