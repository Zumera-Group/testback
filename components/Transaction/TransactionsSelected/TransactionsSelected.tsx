import { useEffect, useRef, useState } from 'react';

import {
  Section,
  Container,
  Grid,
  GridColumn,
  SwiperTransactions,
  SwiperNavigationButtons,
} from 'components/Layout';

import { SectionHeading } from 'components/SectionHeading';
import { TransactionBig } from 'components/NewsGrid/Cards';
import { SwiperSlide } from 'swiper/react';

import styles from './TransactionsSelected.module.scss';
import { useRouter } from 'next/router';
import { fetchTransactions } from 'lib/shared-domain/transactions/application/useGetTransactions';
import { Transaction } from 'lib/shared-domain/transactions/domain';
import { Button } from 'components/Button';

export const TransactionsSelected: React.FC<{
  transaction: Transaction;
  content: any;
}> = ({ transaction, content }) => {
  const transactions = useFetchTransactions();
  const swiperPrevRef = useRef();
  const swiperNextRef = useRef();

  const t = (item) => content?.[item];
  const filteredTransactions = transactions?.filter(
    (t) => t._id !== transaction._id,
  );
  if (!filteredTransactions || filteredTransactions.length === 0) return null;

  return (
    <Section size={'md'} bg={'light'} color={'primary'}>
      <Container>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'start'}
        >
          <GridColumn sm={12} md={12} lg={12}>
            <SectionHeading
              title={t('title')}
              subtitle={t('subtitle')}
              description={t('description')}
              align={'center'}
            />
          </GridColumn>
        </Grid>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'start'}
        >
          <GridColumn sm={12} md={12} lg={12}>
            <SwiperTransactions
              prevButton={swiperPrevRef}
              nextButton={swiperNextRef}
              classes={styles.carousel}
              maxSlidesToShow={3}
            >
              {transactions
                .slice(0, 50)
                ?.sort(
                  (a, b) =>
                    new Date(b.date || null).getTime() -
                    new Date(a.date || null).getTime(),
                )
                .map((t) => (
                  <SwiperSlide
                    key={`sectorTransactions-${t._id}`}
                    className={styles.slide}
                  >
                    <TransactionBig article={t} />
                  </SwiperSlide>
                ))}
            </SwiperTransactions>
            <div className={styles.navigationBtns}>
              {content?.linkText ? (
                <Button
                  variant={'secondary'}
                  link={{ slug: { current: `/transactions` } }}
                  classes={styles.button}
                >
                  {content?.linkText}
                </Button>
              ) : null}
              <SwiperNavigationButtons
                prev={swiperPrevRef}
                next={swiperNextRef}
              />
            </div>
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};

const useFetchTransactions = () => {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchTransactions(router.locale as any).then((t) => {
        setTransactions(t);
      });
    }
  }, []);

  return transactions;
};

export default TransactionsSelected;
