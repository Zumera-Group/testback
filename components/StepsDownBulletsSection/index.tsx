import { Container, Grid, GridColumn, Section } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import styles from './StepsDownBulletsSection.module.scss';
import { StepItem } from 'components/StepsDownBulletsSection/StepItem';
import { StepsDownBulletsSectionModule } from 'lib/shared-domain/page/domain/contentModule';

export const StepsDownBulletsSection: React.FC<{
  specificContentModule: StepsDownBulletsSectionModule;
}> = ({ specificContentModule }) => {
  const { subtitle, title, description, steps } = specificContentModule;
  return (
    <Section size={'md'} bg={'light'} color={'primary'}>
      <Container>
        <Grid fullWidth={true} justifyContent={'start'} alignItems={'stretch'}>
          <GridColumn sm={12} md={6} lg={6}>
            <SectionHeading
              title={title}
              subtitle={subtitle}
              description={description}
            />
          </GridColumn>
          <GridColumn sm={0} md={1} lg={1} className={styles.arrowColumn}>
            <img src={'/VTLanding/arrow-down.svg'} alt="" />
          </GridColumn>
          <GridColumn sm={12} md={5} lg={5} className={styles.rightColumn}>
            <div className={styles.stepsContainer}>
              {steps.map((step, index) => (
                <StepItem key={index} index={index + 1} step={step} />
              ))}
            </div>
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};
