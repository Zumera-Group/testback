import { useRef } from 'react';

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
import { Button } from 'components/Button';

import styles from './SectorTransactions.module.scss';
import { useRouter } from 'next/router';

export const SectorTransactions = ({ transactions, sector, content }) => {
  const router = useRouter();
  const swiperPrevRef = useRef();
  const swiperNextRef = useRef();

  if (!transactions || transactions.length === 0) return null;

  const t = (item) => content?.[item];

  const filteredTransactions = transactions.filter(
    (t) =>
      t.sectors && t.sectors?.map((s) => s?._id).indexOf(sector._id) !== -1,
  );

  if (filteredTransactions.length === 0) return null;

  return (
    <Section
      size={'md'}
      bg={'light'}
      color={'primary'}
      classes={styles.section}
    >
      <Container>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'start'}
        >
          <GridColumn sm={12} md={12} lg={12}>
            <SectionHeading
              title={t('subtitle')}
              subtitle={t('title')}
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
                  link={{
                    slug: {
                      current:
                        router.locale === 'en'
                          ? '/transactions'
                          : '/transaktionen',
                    },
                  }}
                  classes={styles.button}
                >
                  {content?.linkText}
                </Button>
              ) : null}
              <div className={styles.swiperButtons}>
                <SwiperNavigationButtons
                  prev={swiperPrevRef}
                  next={swiperNextRef}
                />
              </div>
            </div>
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};

export default SectorTransactions;
