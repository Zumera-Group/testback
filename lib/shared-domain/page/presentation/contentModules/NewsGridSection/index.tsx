import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import { fetchNewsArticles } from 'lib/shared-domain/newsArticle/application/useGetNewsArticles';
import { fetchEmployees } from 'lib/shared-domain/employees/application/useGetEmployees';
import { fetchTransactions } from 'lib/shared-domain/transactions/application/useGetTransactions';

import { NewsGridSectionModule } from '../../../domain/contentModule';

import NewsGrid from 'components/NewsGrid';

export const NewsGridSection: React.FC<{
  specificContentModule: NewsGridSectionModule;
}> = ({ specificContentModule }) => {
  const [transactions, setTransactions] = useState([]);
  const [news, setNews] = useState([]);
  const [employees, setEmployees] = useState([]);

  const router = useRouter();

  useEffect(() => {
    fetchTransactions(router.locale as any).then((t) => {
      setTransactions(t);
    });
    fetchNewsArticles(router.locale as any).then((t) => {
      setNews(t);
    });
    fetchEmployees(router.locale as any).then((t) => {
      setEmployees(t);
    });
  }, [router.locale]);
  return (
    <NewsGrid
      {...specificContentModule}
      employees={employees}
      news={news}
      transactions={transactions}
    />
  );
};

export default NewsGridSection;
