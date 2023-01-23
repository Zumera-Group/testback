import _ from 'lodash';
import { Container, Grid, GridColumn, Section } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import Accordion from 'components/Accordion/Accordion';

export const AccordionSection: React.FC<{ specificContentModule: any }> = ({
  specificContentModule,
}) => {
  const { title, subtitle, description, accordionItems } =
    specificContentModule;
  const getAccordionQuestion = (items) => {
    return items.map((item) => item.title);
  };
  const getAccordionAnswers = (items) => {
    return items.map((item) => item.description);
  };
  console.log(accordionItems);
  return (
    <Section size={'lg'} bg={'light'} color={'primary'}>
      <Container>
        <Grid fullWidth={true} justifyContent={'start'} alignItems={'center'}>
          <SectionHeading
            title={title}
            subtitle={subtitle}
            description={description}
            headingType={'h2'}
            align={'center'}
          />
        </Grid>
        <Grid fullWidth={true} justifyContent={'center'} alignItems={'center'}>
          <GridColumn sm={12} md={10} lg={10}>
            <Accordion
              questions={getAccordionQuestion(accordionItems || [])}
              answers={getAccordionAnswers(accordionItems || [])}
              // answerComponent={AnswerComponent}
            />
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};
