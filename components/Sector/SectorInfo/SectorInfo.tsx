import { Container, Grid, GridColumn, Section } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';

import { Description } from './Description';
import { GrowthRatesTable } from './GrowthRatesTable';
import { TrendsTable } from './TrendsTable';
import { TransactionsTable } from './TransactionsTable';
import { FutureTrends } from './FutureTrends';

import styles from './SectorInfo.module.scss';
import { Accordion } from 'components/Accordion';

export const SectorInfo = ({ sector, sectorTransactions, content }) => {
  const t = (item) => content?.[item];

  const { accordionQuestions } = content || {};
  const {
    infoSection,
    accordionAnswers,
    growthRatesTable,
    trendsTable,
    transactionsTable,
    futureTrendsSection,
  } = sector;

  return (
    <Section
      size={'md'}
      bg={'light'}
      color={'primary'}
      classes={styles.sectorInfo}
    >
      <Container>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'start'}
        >
          <GridColumn sm={12} md={6} lg={6} className={styles.title}>
            <SectionHeading
              title={infoSection?.title}
              subtitle={infoSection?.subtitle}
            />
          </GridColumn>
          <GridColumn sm={12} md={6} lg={6}>
            <Description content={infoSection?.description} />
            <Accordion
              questions={accordionQuestions || []}
              answers={accordionAnswers}
            />
          </GridColumn>
        </Grid>

        <div className={styles.calloutBox}>
          <GrowthRatesTable
            title={t('growthRatesTable')}
            growthRatesTable={growthRatesTable}
          />
          <Grid
            fullWidth={true}
            justifyContent={'space-between'}
            alignItems={'start'}
            className={styles.calloutGrid}
          >
            <GridColumn sm={12} md={12} lg={6}>
              <TrendsTable title={t('trendsTitle')} trendsTable={trendsTable} />
            </GridColumn>
            <GridColumn sm={12} md={12} lg={6}>
              <TransactionsTable
                titles={content?.transactionsTable}
                transactions={sectorTransactions?.length}
                transactionsTable={transactionsTable}
              />
            </GridColumn>
          </Grid>
        </div>
        <FutureTrends futureTrends={futureTrendsSection} />
      </Container>
    </Section>
  );
};

export default SectorInfo;
