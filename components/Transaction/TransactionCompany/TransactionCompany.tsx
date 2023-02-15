import { Container, Grid, GridColumn, Section } from 'components/Layout';
import styles from './TransactionCompany.module.scss';
import { Transaction } from 'lib/shared-domain/transactions/domain';
import Image from 'next/image';
import { SectionHeading } from 'components/SectionHeading';

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
        <SectionHeading
          title={content.representedText}
          headingType={'h3'}
          align={'left'}
        />
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
          />
          <Company
            companyDescription={transaction?.companyDescription2}
            companyImage={transaction.companyLogo2?.asset?.url}
          />
        </Grid>
      </Container>
    </Section>
  );
};

const Company = ({ companyImage, companyDescription }) => (
  <GridColumn sm={12} md={6} lg={6} className={styles.companyCol}>
    <div className={styles.companyLogo}>
      <Image
        unoptimized
        loading="lazy"
        width={'200'}
        height={'64'}
        alt=""
        src={companyImage}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
          objectPosition: 'left',
        }}
      />
    </div>
    <p color={'primary'}>{companyDescription}</p>
  </GridColumn>
);
