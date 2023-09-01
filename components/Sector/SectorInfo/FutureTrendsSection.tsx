import { Section, Container } from 'components/Layout';

import { FutureTrends } from './FutureTrends';

import styles from './SectorInfo.module.scss';

export const FutureTrendsSection = ({ futureTrends }) => {
  return (
    <Section
      size={'md'}
      bg={'light'}
      color={'primary'}
      classes={styles.sectorInfo}
    >
      <Container>
        <FutureTrends futureTrends={futureTrends} />
      </Container>
    </Section>
  );
};

export default FutureTrendsSection;
