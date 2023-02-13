import { useState, useEffect, useMemo } from 'react';

import { Section, Container } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import { LoadMore } from './LoadMore';

import { removeIfNotCDI, sortByTime } from './utils';

import { NewsArticle } from 'lib/shared-domain/newsArticle/domain/index';
import { Transaction } from 'lib/shared-domain/transactions/domain/index';
import { Employee } from 'lib/shared-domain/employees/domain';
import { CardsNew } from 'components/NewsGrid/Cards/CardsNew';
import { sliceIntoChunks } from 'lib/utils/sliceIntoChunks';
import { shuffle } from 'lib/utils/shuffle';

interface Props {
  title: string;
  subtitle: string;
  description: string | any[];
  news: NewsArticle[];
  showAllNews?: boolean;
  employees: Employee[];
  transactions: Transaction[];
  loadMoreText?: string;
  allNewsLinkText?: string;
  showOnlyCDI?: boolean;
  displayDownload?: boolean;
  shouldHideCDITransactions?: boolean;
  shouldHidePeopleUpdates?: boolean;
  initialNumberOfRepetitions?: number;
  titleAlign?: 'left' | 'center' | 'right';
  firstHighlightedArticleSection?: any;
  secondHighlightedArticleSection?: any;
}

export const NewsGrid: React.FC<Props> = ({
  title,
  subtitle,
  description,
  news: allNews,
  showAllNews,
  employees: allEmployees,
  transactions: allTransactions,
  loadMoreText,
  displayDownload = false,
  allNewsLinkText,
  showOnlyCDI = false,
  shouldHideCDITransactions,
  shouldHidePeopleUpdates,
  initialNumberOfRepetitions = 1,
  titleAlign,
  firstHighlightedArticleSection,
  secondHighlightedArticleSection,
}) => {
  const [numberOfRepetitions, setNumberOfRepetitions] = useState(
    initialNumberOfRepetitions,
  );
  const [hasMoreDataToLoad, setHasMoreDataToLoad] = useState(true);

  const numOfTransactionsDisplayed = 3;
  const numOfNewsDisplayed = 5;

  const news =
    allNews
      ?.filter((n) => !n.isPressRelease)
      ?.filter((n) => removeIfNotCDI(n, showOnlyCDI))
      .sort(sortByTime) || [];

  let transactions =
    allTransactions
      ?.filter((n) => removeIfNotCDI(n, showOnlyCDI))
      ?.sort(sortByTime) || [];

  let employees = useMemo(() => {
    return !shouldHidePeopleUpdates
      ? allEmployees
          ?.map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
      : [];
  }, [allEmployees, shouldHidePeopleUpdates]);

  employees =
    employees?.filter((e) => !!e.newsGridPicture?.picture?.asset?.url) || [];

  useEffect(() => {
    const noMoreTransactionsToLoad =
      transactions?.length <= numOfTransactionsDisplayed * numberOfRepetitions;
    const noMoreNewsToLoad =
      news?.length <= numOfNewsDisplayed * numberOfRepetitions;
    const noMoreEmployeesToLoad = employees?.length <= numberOfRepetitions;
    const noMoreDataToLoad =
      noMoreTransactionsToLoad && noMoreNewsToLoad && noMoreEmployeesToLoad;
    const newsPageGridData = showAllNews && loadMoreText && !noMoreDataToLoad;
    const detailPageGridData = loadMoreText && !noMoreDataToLoad;
    if (newsPageGridData || detailPageGridData) {
      setHasMoreDataToLoad(true);
    } else if (noMoreDataToLoad) {
      setHasMoreDataToLoad(false);
    }
  }, [
    numberOfRepetitions,
    transactions,
    news,
    employees,
    allNewsLinkText,
    showAllNews,
    loadMoreText,
  ]);

  if (transactions && shouldHideCDITransactions) {
    transactions = transactions?.filter((t) => !t.hasCDIRelation);
  }

  const all = [...transactions, ...news, ...employees];
  const emptyNews = new Array(all.length).fill(undefined);
  const sortedNews = [...transactions, ...news]
    .map((item) => ({
      ...item,
      sortDate: new Date(item.date).getTime(),
    }))
    .sort((a, b) => {
      return b.sortDate - a.sortDate;
    });

  const shuffleEmployees = shuffle(employees);

  emptyNews[0] = shuffleEmployees.shift();

  for (let i = 0; i <= emptyNews.length - 1; i++) {
    const randomBoolean = i % 14 == 0;
    let item;
    if (randomBoolean) {
      const t = shuffleEmployees.shift();
      if (t) {
        item = t;
      } else {
        item = sortedNews.shift();
      }
    } else {
      item = sortedNews.shift();
    }
    emptyNews[i] = item;
  }
  const chunkedArray = sliceIntoChunks(emptyNews, 10);
  const displayItems = chunkedArray.slice(0, numberOfRepetitions);

  return (
    <Section size={'md'} bg={'light'} color={'primary'} divider={true}>
      <Container>
        <SectionHeading
          title={title}
          subtitle={subtitle}
          description={description}
          headingType={'h2'}
          align={titleAlign || 'center'}
        />

        {displayItems.map((chunk, index) => (
          <CardsNew
            key={index}
            cardsRow={chunk}
            isFirstChunk={index === 0}
            firstHighlightedArticleSection={firstHighlightedArticleSection}
            secondHighlightedArticleSection={secondHighlightedArticleSection}
          />
        ))}

        {hasMoreDataToLoad && (
          <LoadMore
            callBack={() => setNumberOfRepetitions(numberOfRepetitions + 1)}
            text={loadMoreText}
          />
        )}
      </Container>
    </Section>
  );
};

export default NewsGrid;
