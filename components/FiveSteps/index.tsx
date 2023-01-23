import { Container, Section } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import { FiveStepsSectionModule } from 'lib/shared-domain/page/domain/contentModule';
import { Step } from 'components/FiveSteps/Step';
import { Button } from 'components/Button';
import styles from './FiveSteps.module.scss';
export const FiveSteps: React.FC<{
  specificContentModule: FiveStepsSectionModule;
}> = ({ specificContentModule }) => {
  const { title, subtitle, steps, bottomTitle, button } = specificContentModule;
  return (
    <Section size={'md'} bg={'light'} color={'primary'}>
      <Container classes={styles.container}>
        <SectionHeading title={title} subtitle={subtitle} align={'center'} />
        <div className={styles.stepsContainer}>
          {steps.map((step, index) => (
            <Step key={step._key} step={step} />
          ))}
          <div className={styles.divider}></div>
        </div>
        <SectionHeading title={bottomTitle} align={'center'} />
        {button?.title && (
          <Button classes={styles.button} {...button}>
            {button.title}
          </Button>
        )}
      </Container>
    </Section>
  );
};
