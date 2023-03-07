import NewsGrid from 'components/NewsGrid';
import { Employee } from 'lib/shared-domain/employees/domain';
import { NewsArticle } from 'lib/shared-domain/newsArticle/domain';
import { Transaction } from 'lib/shared-domain/transactions/domain';

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

  const t = (item) => content?.[item];

  return (
    <NewsGrid
      title={t('title')}
      subtitle={t('subtitle')}
      description={t('description')}
      employees={[]}
      news={filteredNewsArticles}
      transactions={filteredTransactions}
      titleAlign={'left'}
      loadMoreText={t('allNewsLinkText')}
    />
  );
};
