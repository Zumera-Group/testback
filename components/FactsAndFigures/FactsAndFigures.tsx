import { Section, Container, Grid, GridColumn } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import { Fact } from './Fact';

import styles from './FactsAndFigures.module.scss';

interface Props {
  title?: string;
  subtitle?: string;
  description?: any;
  facts?: Array<any>;
}

export const FactsAndFigures: React.FC<Props> = ({ ...rest }) => {
  const { title, subtitle, description, facts } = rest;

  return (
    <Section
      size={'md'}
      bg={'light'}
      color={'primary'}
    >
      <Container>
        <div className={styles.content}>
          <Grid
            fullWidth={true}
            justifyContent={'space-between'}
            alignItems={'start'}
          >
            <GridColumn sm={12} md={5} lg={5}>
              <SectionHeading
                title={title}
                subtitle={subtitle}
                description={description}
              />
            </GridColumn>
            {Array.isArray(facts) && facts?.length > 0 && (
              <GridColumn sm={12} md={7} lg={7}>
                <div className={styles.facts}>
                  {facts?.map((fact, index) => (
                    <Fact key={`fact-${fact?._key}-${index}`} fact={fact} />
                  ))}
                </div>
              </GridColumn>
            )}
          </Grid>
        </div>
      </Container>
    </Section>
  );
};

export default FactsAndFigures;