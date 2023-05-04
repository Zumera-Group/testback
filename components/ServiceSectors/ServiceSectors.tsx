import { Section, Container, Grid, GridColumn } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import { Button } from 'components/Button';
import { Sector } from 'components/Sectors';
import { links } from 'lib/links';
import styles from './ServiceSectors.module.scss';

interface Props {
  title?: string;
  subtitle?: string;
  description?: any;
  sectors?: Array<any>;
  linkText?: string;
  sectorsOverviewPage?: any;
  customHref?: string;
  displayMaxItems?: number;
}

export const ServiceSectors: React.FC<Props> = ({ ...rest }) => {
  const {
    title,
    subtitle,
    description,
    sectors,
    linkText,
    sectorsOverviewPage,
    displayMaxItems,
  } = rest;
  const displaySectors = displayMaxItems
    ? sectors.slice(0, displayMaxItems)
    : sectors;
  return (
    <Section size={'md'} bg={'light'} color={'primary'}>
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
            {displaySectors
              ?.sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
              })
              .map((sector, index) => (
                <GridColumn
                  key={`${sector?._key}-${index}`}
                  className={styles.sectorWrapper}
                  xs={6}
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <Sector sector={sector} />
                </GridColumn>
              ))}
          </Grid>
        )}
        {sectorsOverviewPage?.slug?.current ? (
          <div className={styles.btnWrapper}>
            <Button
              variant={'secondary'}
              onDark={false}
              link={{ slug: { current: links().sectors({} as any) } }}
            >
              {linkText}
            </Button>
          </div>
        ) : null}
      </Container>
    </Section>
  );
};

export default ServiceSectors;
