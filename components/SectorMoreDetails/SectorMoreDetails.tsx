import { Section, Container, Grid, GridColumn } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';

import styles from './SectorMoreDetails.module.scss';

interface Props {
  moreDetailsDescription: any;
  title: string;
  sectorMoreDetailsPicture: {
    asset: {
      url: string;
    }
  }
}

export const SectorMoreDetails: React.FC<Props> = ({
  moreDetailsDescription,
  sectorMoreDetailsPicture,
  title,
}) => {
  return (
    <Section
      size={'md'}
      bg={'light'}
      color={'primary'}
    >
      <Container>
        <div className={styles.calloutBox}>
          <Grid
            fullWidth={true}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <GridColumn sm={12} md={6} lg={6}>
              <SectionHeading
                headingType={'h3'}
                title={title}
                description={moreDetailsDescription}
              />
            </GridColumn>
            <GridColumn sm={12} md={6} lg={6}>
              <div className={styles.imageWrapper}>
                <img src={sectorMoreDetailsPicture.asset.url} />
              </div>
            </GridColumn>
          </Grid>
        </div>
      </Container>
    </Section>
  );
};

export default SectorMoreDetails;