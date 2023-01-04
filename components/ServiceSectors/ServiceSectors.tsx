import { Section, Container, Grid, GridColumn } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import { Button } from 'components/Button';
import { Sector } from 'components/Sectors';

import styles from './ServiceSectors.module.scss';

interface Props {
  title?: string;
  subtitle?: string;
  description?: any;
  sectors?: Array<any>;
  linkText?: string;
  sectorsOverviewPage?: any;
}

export const ServiceSectors: React.FC<Props> = ({ ...rest }) => {
  const {
    title,
    subtitle,
    description,
    sectors,
    linkText,
    sectorsOverviewPage
  } = rest;

  return (
    <Section
      size={'md'}
      bg={'light'}
      color={'primary'}>
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
        {sectorsOverviewPage?.slug?.current && (
          <div className={styles.btnWrapper}>
            <Button
              variant={'secondary'}
              onDark={false}
              link={sectorsOverviewPage}
            >
              {linkText}
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
};

export default ServiceSectors;