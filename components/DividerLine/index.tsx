import styles from './DividerLine.module.scss';
import { Container, Section } from 'components/Layout';
export const DividerLine: React.FC<any> = () => (
  <Section size={'md'} bg={'light'} color={'primary'}>
    <Container>
      <div className={styles.dividerLine} />
    </Container>
  </Section>
);
