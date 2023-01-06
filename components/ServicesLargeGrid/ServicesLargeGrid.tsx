import { SectionHeading } from 'components/SectionHeading';
import { Section, Container, Grid, GridColumn } from 'components/Layout';
import { Services } from './Services';

import styles from './ServicesLargeGrid.module.scss';

export const ServicesLargeGrid = ({ ...rest }) => {
  const { title, subtitle, description, services, linkText } = rest;
  return (
    <Section
      size={'md'}
      bg={'light'}
      color={'primary'}
    >
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
                headingType={'h3'}
                align={'left'} />
            </GridColumn>
            {Array.isArray(services) && services?.length > 0 && (
              <GridColumn sm={12} md={8} lg={7}>
                <Services services={services} linkText={linkText} />
              </GridColumn>
            )}
          </Grid>
        </div>
      </Container>
    </Section>
  );
};

export default ServicesLargeGrid;