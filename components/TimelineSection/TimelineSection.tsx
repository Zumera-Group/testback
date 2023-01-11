import { Container, Grid, GridColumn, Section } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import styles from './TimelineSection.module.scss';
import { ServiceItem } from 'components/TimelineSection/ServiceItem';

export interface IService {
  name: string;
  description: string;
  shortDescription: string;
  slug: {
    current: string;
  };
}

interface IProps {
  title: string;
  description: any[];
  services: IService[];
}
export const TimelineSection: React.FC<IProps> = ({
  title,
  description,
  services,
}) => {
  return (
    <Section size={'md'} bg={'light'} color={'primary'}>
      <Container>
        <Grid
          fullWidth={true}
          justifyContent={'start'}
          alignItems={'stretch'}
          className={styles.timelineSectionGrid}
        >
          <GridColumn sm={12} md={6} lg={6}>
            <Grid
              fullWidth={true}
              justifyContent={'start'}
              alignItems={'stretch'}
            >
              <GridColumn
                sm={8}
                md={11}
                lg={9}
                className={styles.headingColumn}
              >
                <SectionHeading title={title} description={description} />
              </GridColumn>
            </Grid>
            <img
              src={'/timelineSection/city.svg'}
              alt={'City'}
              className={styles.cityImage}
            />
          </GridColumn>
          <GridColumn sm={12} md={6} lg={6} className={styles.rightColumn}>
            <img
              src={'/timelineSection/building.svg'}
              alt={'Building'}
              className={styles.building}
            />
            <div className={styles.timelineContainer}>
              {services.map((service, index) => (
                <ServiceItem key={index} index={index + 1} service={service} />
              ))}
            </div>
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};
