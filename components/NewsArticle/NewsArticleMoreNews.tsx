import NewsGrid from 'components/NewsGrid';
import { fetchTransactions } from 'lib/shared-domain/transactions/application/useGetTransactions';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

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

const NewsArticleMoreNews: React.FC<{
  employees: any;
  newsArticles: any;
  content: any;
}> = ({ employees, newsArticles, content }) => {
  const transactions = useFetchTransactions();

  return (
    <NewsGrid
      title={content?.title}
      subtitle={content?.subtitle}
      description={content?.description}
      employees={employees}
      news={newsArticles}
      transactions={transactions}
      loadMoreText={content?.allNewsLinkText}
    />
  );
};

export default NewsArticleMoreNews;
