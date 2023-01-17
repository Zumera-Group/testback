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

import styles from './SectorTransactions.module.scss';

export const SectorTransactions = ({ transactions, sector, content }) => {
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
    <Section size={'md'} bg={'light'} color={'primary'}>
      <Container>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'start'}
        >
          <GridColumn sm={12} md={12} lg={5}>
            <SectionHeading
              title={t('subtitle')}
              subtitle={t('title')}
              description={t('description')}
            />
          </GridColumn>
          <GridColumn sm={12} md={12} lg={7}>
            <SwiperTransactions
              prevButton={swiperPrevRef}
              nextButton={swiperNextRef}
              classes={styles.carousel}
              maxSlidesToShow={2}
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

export default SectorTransactions;
