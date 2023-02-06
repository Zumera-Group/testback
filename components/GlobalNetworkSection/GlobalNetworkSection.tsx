import { Container, Grid, GridColumn, Section } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import { useFetchOffices } from 'lib/shared-domain/offices/application/useGetOffices';
import { useGlobalNetwork } from 'lib/shared-domain/page/presentation/contentModules/GlobalNetworkSection/useGlobalNetwork';
import { slugifyOffice } from 'lib/shared-domain/offices/application/slugifyOffice';
import Link from 'next/link';
import { Icon } from 'components/Icon';
import styles from './GlobalNetworkSection.module.scss';
import { Accordion } from 'components/Accordion';

export const GlobalNetworkSection: React.FC<any> = ({
  title,
  subtitle,
  description,
}) => {
  const offices = useFetchOffices();
  const { continents, continentsWithCDIOffices } = useGlobalNetwork(offices);
  return (
    <Section size={'md'} bg={'light'} color={'primary'}>
      <Container>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'start'}
        >
          <GridColumn sm={12} md={6} lg={6}>
            <SectionHeading
              title={title}
              subtitle={subtitle || `Global`}
              description={description}
            />
          </GridColumn>
          <GridColumn sm={12} md={6} lg={6}>
            <Accordion
              questions={continents}
              answers={continentsWithCDIOffices as any}
              answerComponent={AnswerComponent}
            />
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};

const AnswerComponent = ({ answer }) => (
  <div className={styles.officeGrid}>
    {answer.map((item) => {
      // const link = 'cdi-global/' + slugifyOffice(item.city);
      return (
        <div key={item._id} className={styles.office}>
          <h5>{item.city}</h5>
          <address>
            <span>
              {item.street} {item.houseNumber}
            </span>
            <span>
              {item.zipCode} {item.city}
            </span>
            <span>{item.country}</span>
          </address>
        </div>
      );
    })}
  </div>
);
