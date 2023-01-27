import {
  Container,
  Grid,
  GridColumn,
  Section,
  SwiperNavigationButtons,
} from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './TransactionGridSection.module.scss';
import { TransactionSelectorTile } from 'components/TransactionGridSection/TransactionSelectorTile';
import { ISectorsDropdown } from 'lib/shared-domain/page/domain/contentModule';

import { SwiperSlide } from 'swiper/react';
import { fetchTransactions } from 'lib/shared-domain/transactions/application/useGetTransactions';
import { useRouter } from 'next/router';
import { TransactionCard } from 'components/TransactionGridSection/TransactionCard';
import { Loader } from 'components/Loader';
import { SwiperTransactionsGrid } from 'components/Layout/SwiperTransactionsGrid';
import { Locale } from 'lib/locale';
import { Button } from 'components/Button';

interface IProps {
  buttonText: string;
  dropdownsTitle: string;
  sectorsDropdown: ISectorsDropdown[];
}

export const TransactionGridSection: React.FC<IProps> = (props) => {
  const router = useRouter();
  const { dropdownsTitle, sectorsDropdown } = props;
  const [activeSector, setActiveSector] = useState('0');
  const [transactions, setTransaction] = useState([]);
  const swiperPrevRef = useRef();
  const swiperNextRef = useRef();
  const [loading, setLoading] = useState(true);
  const [activeChunk, setActiveChunk] = useState(1);
  const [displayTransaction, setDisplayTransaction] = useState([]);
  console.log(props);
  useEffect(() => {
    const transactionsToDisplay = transactions
      .filter((item) => {
        if (activeSector === '0') {
          return item;
        }
        if (!item.sectors) {
          return item;
        }
        const sectorsId = item.sectors.map((sec) => sec._id);
        return sectorsId.includes(activeSector);
      })
      ?.sort(
        (a, b) =>
          new Date(b.date || null).getTime() -
          new Date(a.date || null).getTime(),
      )
      .reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / chunkSize);

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = []; // start a new chunk
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
      }, []);
    setDisplayTransaction(transactionsToDisplay.slice(0, activeChunk).flat());
  }, [transactions, activeChunk, activeSector]);

  useEffect(() => {
    setActiveChunk(1);
  }, [activeSector]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchTransactions(router.locale as any).then((transactionsResp) => {
        setTransaction(transactionsResp);
        setLoading(false);
      });
    }
  }, [router.locale]);

  const sectorClickHandler = useCallback((state) => {
    setActiveSector(state);
  }, []);

  const chunkSize = 12;

  return (
    <Section
      size={'md'}
      bg={'primary'}
      color={'white'}
      classes={styles.sectionWrapper}
    >
      <Container>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'end'}
          className={styles.sliderHeader}
        >
          <GridColumn xs={12} sm={6} md={6} lg={6}>
            <SectionHeading title={dropdownsTitle} headingType={'h3'} />
          </GridColumn>
          <GridColumn
            xs={12}
            sm={6}
            md={6}
            lg={6}
            className={styles.sliderButtons}
          >
            <SwiperNavigationButtons
              prev={swiperPrevRef}
              next={swiperNextRef}
            />
          </GridColumn>
        </Grid>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'end'}
        >
          <GridColumn xs={12} sm={12} md={12} lg={12}>
            <SwiperTransactionsGrid
              prevButton={swiperPrevRef}
              nextButton={swiperNextRef}
              maxSlidesToShow={7}
              classes={styles.swiper}
            >
              <SwiperSlide>
                <TransactionSelectorTile
                  sector={{ name: 'All', _id: '0', slug: { current: '' } }}
                  activeSector={activeSector}
                  clickHandler={sectorClickHandler}
                  locale={router.locale as Locale}
                />
              </SwiperSlide>
              {sectorsDropdown.map((sector) => (
                <SwiperSlide key={sector._id}>
                  <TransactionSelectorTile
                    sector={sector}
                    activeSector={activeSector}
                    clickHandler={sectorClickHandler}
                    locale={router.locale as Locale}
                  />
                </SwiperSlide>
              ))}
            </SwiperTransactionsGrid>
          </GridColumn>
        </Grid>
        {!loading && transactions.length ? (
          <Grid
            fullWidth={true}
            justifyContent={'space-between'}
            alignItems={'end'}
          >
            <GridColumn
              xs={12}
              sm={12}
              md={12}
              lg={12}
              className={styles.transactionsGrid}
            >
              {displayTransaction.map((trans) => (
                <TransactionCard key={trans._id} transaction={trans} />
              ))}
            </GridColumn>
            <Button
              variant={'secondary'}
              onDark={true}
              hideIcon={true}
              callBack={() => setActiveChunk(activeChunk + 1)}
              classes={styles.loadMore}
            >
              {props.buttonText} +
            </Button>
          </Grid>
        ) : (
          <Loader className={styles.loader} />
        )}
      </Container>
    </Section>
  );
};
