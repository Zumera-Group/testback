import { Section, Container, Grid, GridColumn } from 'components/Layout';

import baseStyles from 'components/Hero/Hero.module.scss';
import styles from './TransactionHero.module.scss';
import { SectionHeading } from 'components/SectionHeading';
import { TransactionCard } from 'components/Transaction/TransactionCard';

export const TransactionHero = ({ transaction, content }) => {
  return (
    <Section
      as={'div'}
      classes={[baseStyles.hero].join(' ')}
      size={'lg'}
      bg={'light'}
      color={'primary'}
    >
      <Container classes={styles.transactionHeroContainer}>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <GridColumn sm={12} md={6} lg={6} className={styles.headingColumn}>
            <SectionHeading
              title={transaction.headline}
              subtitle={content.heroSubtitle}
              headingType={'h3'}
              align={'left'}
            />
          </GridColumn>
          <GridColumn sm={12} md={6} lg={6}>
            <TransactionCard transaction={transaction} />
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};

export default TransactionHero;
