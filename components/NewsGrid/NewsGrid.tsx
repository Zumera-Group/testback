import { useState, useEffect, useMemo } from 'react';

import { Section, Container } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import { LoadMore } from './LoadMore';
import { Cards } from './Cards';

import { removeIfNotCDI, sortByTime } from './utils';

import { NewsArticle } from 'lib/shared-domain/newsArticle/domain/index';
import { Transaction } from 'lib/shared-domain/transactions/domain/index';
import { Employee } from 'lib/shared-domain/employees/domain';

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
}) => {
  const [numberOfRepetitions, setNumberOfRepetitions] = useState(
    initialNumberOfRepetitions,
  );
  const [hasMoreDataToLoad, setHasMoreDataToLoad] = useState(true);

  const numOfTransactionsDisplayed = 3;
  const numOfNewsDisplayed = 5;

  const news = allNews
    ?.filter((n) => !n.isPressRelease)
    ?.filter((n) => removeIfNotCDI(n, showOnlyCDI))
    .sort(sortByTime);

  let transactions = allTransactions
    ?.filter((n) => removeIfNotCDI(n, showOnlyCDI))
    ?.sort(sortByTime);

  let employees = useMemo(() => {
    return !shouldHidePeopleUpdates
      ? allEmployees
          ?.map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
      : [];
  }, [allEmployees, shouldHidePeopleUpdates]);

  employees = employees?.filter(
    (e) => !!e.newsGridPicture?.picture?.asset?.url,
  );

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
  console.log('test build');
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

        {new Array(numberOfRepetitions).fill(undefined).map((_i, i) => {
          const numT = numOfTransactionsDisplayed;
          const numN = numOfNewsDisplayed;
          return (
            <Cards
              key={`newsGridCards-${i}`}
              transactions={transactions?.slice(i * numT, numT + i * numT)}
              employee={employees?.[i]}
              news={news?.slice(i * numN, numN + i * numN)}
              isDownloadVisible={i === 0 && displayDownload}
              isAfterSecondBlock={i > 0}
            />
          );
        })}

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
