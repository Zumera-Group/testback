import { Container, Grid, GridColumn, Section } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import { TransactionCard } from 'components/Transaction/TransactionCard';
import styles from './TransactionQuote.module.scss';
import Image from 'next/image';
export const TransactionQuote: React.FC<any> = ({ specificContentModule }) => {
  const { subtitle, title, quoteText, name, position, photo, transaction } =
    specificContentModule;
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
              description={quoteText}
              title={title}
              subtitle={subtitle}
              headingType={'h3'}
            />
            <div className={styles.quoteNameSection}>
              <div>
                <h5 className={styles.name}>{name}</h5>
                <div className={styles.position}>{position}</div>
              </div>
              <div>
                <div className={styles.image}>
                  <Image
                    unoptimized
                    loading="lazy"
                    src={photo?.asset?.url}
                    layout={'fill'}
                    objectFit={'cover'}
                  />
                </div>
              </div>
            </div>
          </GridColumn>
          <GridColumn xs={12} sm={7} md={7} lg={7}>
            <TransactionCard transaction={transaction} />
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};
