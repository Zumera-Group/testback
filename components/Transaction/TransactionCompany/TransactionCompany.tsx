import { Container, Grid, GridColumn, Section } from 'components/Layout';
import styles from './TransactionCompany.module.scss';
import { Transaction } from 'lib/shared-domain/transactions/domain';
import Image from 'next/image';
import { sanityImageUrlFor } from 'lib/sanity';

export const TransactionCompany: React.FC<{
  transaction: Transaction;
  content: any;
}> = ({ transaction, content }) => {
  if (
    !transaction?.companyDescription1?.length ||
    !transaction?.companyDescription2?.length
  ) {
    return null;
  }

  return (
    <Section size={'md'} bg={'light'} color={'primary'}>
      <Container classes={styles.headingContainer}>
        {transaction.highlightSellers?.length ? (
          <h3>
            <span className={styles.bodyTitle}>
              {transaction.representationHeadline}{' '}
            </span>
          </h3>
        ) : null}
      </Container>
      <Container classes={styles.container}>
        <Grid
          fullWidth={true}
          justifyContent={'start'}
          alignItems={'stretch'}
          className={styles.containerInner}
        >
          <Company
            companyDescription={transaction?.companyDescription1}
            companyImage={transaction.companyLogo1?.asset?.url}
            companyName={transaction.companyName1}
          />
          <Company
            companyDescription={transaction?.companyDescription2}
            companyImage={transaction.companyLogo2?.asset?.url}
            companyName={transaction.companyName2}
          />
        </Grid>
      </Container>
    </Section>
  );
};

const Company = ({ companyImage, companyDescription, companyName }) => (
  <GridColumn sm={12} md={6} lg={6} className={styles.companyCol}>
    <div className={styles.companyLogo}>
      {companyImage ? (
        <Image
          unoptimized
          loading="lazy"
          width={'200'}
          height={'64'}
          alt=""
          src={sanityImageUrlFor(companyImage)?.url()}
          sizes="100vw"
          style={{
            height: '70px',
            objectFit: 'contain',
            objectPosition: 'left',
          }}
        />
      ) : (
        <h2>{companyName}</h2>
      )}
    </div>
    <p color={'primary'}>{companyDescription}</p>
  </GridColumn>
);
