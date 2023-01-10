import React from 'react';

import { NewsGridSectionModule } from '../../../domain/contentModule';

import { NewsGrid } from 'lib/shared-domain/newsArticle/presentation/NewsGrid';
import {
  fetchNewsArticles,
  useFetchNewsArticles,
} from '../../../../newsArticle/application/useGetNewsArticles';
import {
  fetchEmployees,
  useFetchEmployees,
} from 'lib/shared-domain/employees/application/useGetEmployees';
import { useOnElementIntersecting } from 'lib/hooks/useOnElementIntersecting';
import { Box } from 'components/Layout/Flex/Flex';
import { fetchTransactions } from 'lib/shared-domain/transactions/application/useGetTransactions';
import { useRouter } from 'next/router';

export const NewsGridSection: React.FC<{
  specificContentModule: NewsGridSectionModule;
}> = ({ specificContentModule }) => {
  const [transactions, setTransactions] = React.useState([]);
  const [newsArticles, setNewsArticles] = React.useState([]);
  const [employees, setEmployees] = React.useState([]);

  const router = useRouter();

  const [containerRef, isVisible] = useOnElementIntersecting({
    threshold: 0,
    rootMargin: '0px 0px -20px 0px',
  });

  React.useEffect(() => {
    if (typeof window !== 'undefined' && isVisible) {
      fetchTransactions(router.locale as any).then((t) => {
        setTransactions(t);
      });
      fetchNewsArticles(router.locale as any).then((t) => {
        setNewsArticles(t);
      });
      fetchEmployees(router.locale as any).then((t) => {
        setEmployees(t);
      });
    }
  }, [isVisible]);

  return (
    <Box ref={containerRef}>
      {isVisible && (
        <NewsGrid
          {...specificContentModule}
          employees={employees}
          newsArticles={newsArticles}
          transactions={transactions}
        />
      )}
    </Box>
  );
};

export default NewsGridSection;