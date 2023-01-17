import { Container, Section } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import styles from './ServiceProcess.module.scss';

export const ServiceProcess: React.FC<any> = ({ process }) => {
  const { title, steps } = process;
  return (
    <Section size={'md'} bg={'light'} color={'primary'}>
      <Container>
        <SectionHeading title={title} headingType={'h3'} align={'center'} />
        <div className={styles.steps}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <h2 className={styles.stepNum}>{index + 1}</h2>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
