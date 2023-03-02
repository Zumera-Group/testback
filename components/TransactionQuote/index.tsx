import { Container, Grid, GridColumn, Section } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import { TransactionCard } from 'components/Transaction/TransactionCard';
import styles from './TransactionQuote.module.scss';
import Image from 'next/image';
export const TransactionQuote: React.FC<any> = ({ specificContentModule }) => {
  const { subtitle, title, transaction } = specificContentModule;

  const { optionalUI } = transaction;
  return (
    <Section size={'md'} bg={'primary'} color={'white'}>
      <Container>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <GridColumn xs={12} sm={5} md={5} lg={5}>
            <SectionHeading
              description={`“${optionalUI?.involvedParty1?.quote}”`}
              title={title}
              subtitle={subtitle}
              headingType={'h3'}
            />
            {optionalUI?.involvedParty1 ? (
              <div className={styles.quoteNameSection}>
                <div>
                  <h5 className={styles.name}>
                    {optionalUI?.involvedParty1?.name}
                  </h5>
                  <div className={styles.position}>
                    {optionalUI?.involvedParty1?.jobTitle}
                  </div>
                </div>
                <div>
                  <div className={styles.image}>
                    <Image
                      src={optionalUI?.involvedParty1?.companyLogo?.asset?.url}
                      fill
                      style={{ objectFit: 'cover' }}
                      alt={'Company Logo'}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </GridColumn>
          <GridColumn xs={12} sm={7} md={7} lg={7}>
            <TransactionCard transaction={transaction} />
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};
