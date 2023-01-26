import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import {
  Section,
  Container,
  Grid,
  GridColumn,
  SwiperTransactions,
  SwiperNavigationButtons,
} from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import { Loader } from 'components/Loader';
import { SwiperSlide } from 'swiper/react';
import { TransactionBig } from 'components/NewsGrid/Cards';

import { filterTransactions } from './filterTransactions';

import { useOnElementIntersecting } from 'lib/hooks/useOnElementIntersecting';
import { fetchTransactions } from 'lib/shared-domain/transactions/application/useGetTransactions';

import styles from './AllTransactionsCarousel.module.scss';
import { Button } from 'components/Button';

export const AllTransactionsCarousel = ({ ...rest }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const swiperPrevRef = useRef();
  const swiperNextRef = useRef();

  const router = useRouter();
  const [wrapperRef, isVisible] = useOnElementIntersecting({
    threshold: 0,
    rootMargin: '0px 0px -20px 0px',
  });

  const { title, subtitle, description, button } = rest;

  useEffect(() => {
    if (typeof window !== 'undefined' && isVisible) {
      fetchTransactions(router.locale as any).then((t) => {
        setTransactions(t);
        setLoading(false);
      });
    }
  }, [isVisible, router]);

  const transactionsFiltered = filterTransactions(rest, transactions);

  const Carousel = ({ transactions }) => {
    if (!transactions || transactions?.length === 0) return null;
    return (
      <SwiperTransactions
        prevButton={swiperPrevRef}
        nextButton={swiperNextRef}
        classes={styles.carousel}
        maxSlidesToShow={3}
      >
        {transactions
          ?.slice(0, 50)
          ?.sort(
            (a, b) =>
              new Date(b.date || null).getTime() -
              new Date(a.date || null).getTime(),
          )
          .map((t) => (
            <SwiperSlide
              key={`transactionsCarousel-${t._id}`}
              className={styles.slide}
            >
              <TransactionBig article={t} />
            </SwiperSlide>
          ))}
      </SwiperTransactions>
    );
  };
  return (
    <div ref={wrapperRef}>
      <Section size={'md'} bg={'light'} color={'primary'}>
        <Container>
          <Grid fullWidth={true} justifyContent={'center'} alignItems={'end'}>
            <GridColumn xs={12} sm={6} md={6} lg={6}>
              <SectionHeading
                title={title}
                subtitle={subtitle}
                description={description}
                align={'center'}
                headingType={'h3'}
              />
            </GridColumn>
          </Grid>
          {isVisible && !loading ? (
            <Carousel transactions={transactionsFiltered} />
          ) : (
            <Loader />
          )}
          {!loading && (
            <GridColumn
              xs={12}
              sm={6}
              md={6}
              lg={6}
              className={styles.navigationColumn}
            >
              {button?.title ? (
                <Button {...button} classes={styles.button}>
                  {button.title}
                </Button>
              ) : null}
              <SwiperNavigationButtons
                prev={swiperPrevRef}
                next={swiperNextRef}
              />
            </GridColumn>
          )}
        </Container>
      </Section>
    </div>
  );
};

export default AllTransactionsCarousel;
