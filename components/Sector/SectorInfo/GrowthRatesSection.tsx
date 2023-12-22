import { Section, Container, Grid, GridColumn } from 'components/Layout';

import { GrowthRatesTable } from './GrowthRatesTable';
import { TrendsTable } from './TrendsTable';
import { TransactionsTable } from './TransactionsTable';

import styles from './SectorInfo.module.scss';

export const GrowthRatesSection = ({
  growthRatesTable,
  transactionsTable,
  trendsTable,
}) => {

  return (
    <Section
      size={'md'}
      bg={'light'}
      color={'primary'}
      classes={styles.sectorInfo}
    >
      <Container>
        <div className={styles.calloutBox}>
          <GrowthRatesTable
            isResultsCompactOnMobile={false}
            title={growthRatesTable.title}
            growthRatesTable={growthRatesTable}
          />
          <Grid
            fullWidth={true}
            justifyContent={'space-between'}
            alignItems={'start'}
            className={styles.calloutGrid}
          >
            <GridColumn sm={12} md={12} lg={6}>
              <TrendsTable title={trendsTable.title} trendsTable={trendsTable} />
            </GridColumn>
            <GridColumn sm={12} md={12} lg={6}>
              <TransactionsTable
                titles={{
                  tableTitle: transactionsTable.tableTitle,
                  numberTitle: transactionsTable.numberTitle,
                  mostPopularTitle: transactionsTable.mostPopularTitle,
                  mAndANumber: transactionsTable.mAndANumber,
                  significantTransactionsTitle:
                    transactionsTable.significantTransactionsTitle,
                }}
                transactions={transactionsTable.transactionsNumber}
                transactionsTable={transactionsTable}
              />
            </GridColumn>
          </Grid>
        </div>
      </Container>
    </Section>
  );
};

export default GrowthRatesSection;
