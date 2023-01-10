import { Section, Container, Grid, GridColumn } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import { Sector } from './Sector';

import styles from './Sectors.module.scss';

interface Props {
  title?: string;
  subtitle?: string;
  description?: any;
  sectors?: any;
}

export const Sectors: React.FC<Props> = ({ ...rest }) => {
  const { title, subtitle, description, sectors } = rest;

  return (
    <Section
      size={'md'}
      bg={'light'}
      color={'primary'}
    >
      <Container>
        <SectionHeading
          title={title}
          subtitle={subtitle}
          description={description}
          headingType={'h3'}
          align={'center'}
        />
        {sectors?.length > 0 && (
          <Grid
            fullWidth={true}
            justifyContent={'start'}
            alignItems={'stretch'}
            className={styles.sectors}
          >
            {sectors?.map((sector, index) => (
              <GridColumn
                key={`${sector?._key}-${index}`}
                className={styles.sectorWrapper}
                xs={12}
                sm={6}
                md={4}
                lg={3}
              >
                <Sector sector={sector} />
              </GridColumn>
            ))}
          </Grid>
        )}
      </Container>
    </Section>
  );
};

export default Sectors;