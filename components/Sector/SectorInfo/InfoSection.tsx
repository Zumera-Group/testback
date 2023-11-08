import { Section, Container, Grid, GridColumn } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';

import { Description } from './Description';

import styles from './SectorInfo.module.scss';
import { Accordion } from 'components/Accordion';

export const InfoSection = ({ title, subtitle, description, accordionQuestionAndAnswers = [] }) => {
  const accordionAnswers = accordionQuestionAndAnswers.map((item) => item.description);
  const accordionQuestions = accordionQuestionAndAnswers.map((item) => item.title);
  return (
    <Section
      size={'md'}
      bg={'light'}
      color={'primary'}
      classes={styles.sectorInfo}
    >
      <Container>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'start'}
        >
          <GridColumn sm={12} md={6} lg={6} className={styles.title}>
            <SectionHeading
              title={title}
              subtitle={subtitle}
            />
          </GridColumn>
          <GridColumn sm={12} md={6} lg={6}>
            <Description content={description} />
            <Accordion
              questions={accordionQuestions}
              answers={accordionAnswers}
            />
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};

export default InfoSection;
