import { NewsGrid } from 'lib/shared-domain/newsArticle/presentation/NewsGrid';
import { fetchTransactions } from 'lib/shared-domain/transactions/application/useGetTransactions';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Employee } from '../../employees/domain/index';
import { NewsArticle } from '../../newsArticle/domain/index';

export const useFetchTransactions = () => {
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

export const NewsArticleMoreNews: React.FC<{
  employees: Employee[];
  newsArticles: NewsArticle[];
  content: any;
}> = ({ employees, newsArticles, content }) => {
  const transactions = useFetchTransactions();

  return (
    <NewsGrid
      linkText={content?.linkText}
      title={content?.title}
      subtitle={content?.subtitle}
      loadMoreText={content?.allNewsLinkText}
      description={content?.description}
      employees={employees}
      newsArticles={newsArticles}
      transactions={transactions}
    />
  );
};
