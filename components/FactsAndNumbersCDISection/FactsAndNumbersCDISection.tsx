import { SectionHeading } from 'components/SectionHeading';
import { Section, Container, Grid, GridColumn } from 'components/Layout';
import { Facts } from './Facts';

import styles from './FactsAndNumbersCDISection.module.scss';
import { FactsAndNumbersCDISectionModule } from 'lib/shared-domain/page/domain/contentModule';

export const FactsAndNumbersCDISection: React.FC<
  FactsAndNumbersCDISectionModule
> = ({ ...rest }) => {
  const { title, subtitle, description, facts } = rest;
  return (
    <Section size={'md'} bg={'light'} color={'primary'}>
      <Container>
        <div className={styles.content}>
          <Grid
            justifyContent={'space-between'}
            alignItems={'start'}
            fullWidth={true}
          >
            <GridColumn sm={12} md={4} lg={4}>
              <SectionHeading
                title={title}
                subtitle={subtitle}
                description={description}
                headingType={'h2'}
                align={'left'}
              />
            </GridColumn>
            {Array.isArray(facts) && facts?.length > 0 && (
              <GridColumn sm={12} md={8} lg={7}>
                <Facts facts={facts} />
              </GridColumn>
            )}
          </Grid>
        </div>
      </Container>
    </Section>
  );
};
