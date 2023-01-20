import { Container, Grid, Section, GridColumn } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import { SanityBlockContent } from 'components/SanityBlockContent';
import styles from './AnchoredTextSection.module.scss';
import { Accordion } from 'components/Accordion';
import { Button } from 'components/Button';
import { Fragment } from 'react';
export const AnchoredTextSection = ({ specificContentModule }) => {
  const { title, textBlocks, hasBorderBottom } = specificContentModule;

  const getAccordionQuestion = (items) => {
    return items.map((item) => item.title);
  };
  const getAccordionAnswers = (items) => {
    return items.map((item) => item.description);
  };
  return (
    <Section
      as={'div'}
      size={'sm'}
      bg={'light'}
      color={'primary'}
      id={title.replaceAll(' ', '-')}
    >
      <Container classes={hasBorderBottom && styles.border}>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'start'}
        >
          <GridColumn sm={12} md={6} lg={6}>
            <SectionHeading title={title} headingType={'h3'} align={'left'} />
          </GridColumn>
          <GridColumn sm={12} md={6} lg={6}>
            {textBlocks?.map((textBlock) => {
              if (textBlock._type === 'accordion') {
                return (
                  <Fragment key={textBlock._key}>
                    <p>{textBlock.title}</p>
                    <Accordion
                      questions={getAccordionQuestion(
                        textBlock.accordionItems || [],
                      )}
                      answers={getAccordionAnswers(
                        textBlock.accordionItems || [],
                      )}
                      answerComponent={AnswerComponent}
                    />
                  </Fragment>
                );
              }

              if (textBlock._type === 'button') {
                return (
                  <Button
                    key={textBlock._key}
                    variant={'primary'}
                    externalUrl={textBlock.link}
                  >
                    {textBlock.text}
                  </Button>
                );
              }

              return (
                <SanityBlockContent key={textBlock._key} text={textBlock} />
              );
            })}
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};

const AnswerComponent = ({ answer }) => {
  return <SanityBlockContent text={answer} />;
};
