import { NewsGrid } from 'lib/shared-domain/newsArticle/presentation/NewsGrid';
import { Transaction } from 'lib/shared-domain/transactions/domain';
import React from 'react';
import { Employee } from '../../employees/domain/index';
import { NewsArticle } from '../../newsArticle/domain/index';

export const EmployeeNews: React.FC<{
  employee: Employee;
  newsArticles: NewsArticle[];
  transactions: Transaction[];
  content: any;
}> = ({ employee, newsArticles, transactions, content }) => {
  const filteredTransactions = transactions.filter(
    (t) =>
      t.peopleInvolved &&
      t.peopleInvolved?.map((s) => s._id).indexOf(employee._id) !== -1,
  );
  const filteredNewsArticles = newsArticles.filter(
    (n) => n.team && n.team?.map((s) => s._id).indexOf(employee._id) !== -1,
  );

  if (filteredTransactions.length === 0 && filteredNewsArticles.length === 0)
    return null;

  return (
    <NewsGrid
      linkText={content?.linkText}
      title={content?.title}
      subtitle={content?.subtitle}
      description={content?.description}
      employees={[]}
      newsArticles={filteredNewsArticles}
      transactions={filteredTransactions}
      loadMoreText={content?.allNewsLinkText}
      initialNumberOfRepetitions={10}
    />
  );
};
