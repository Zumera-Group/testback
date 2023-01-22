import NewsGrid from 'components/NewsGrid';
import { Office } from 'lib/shared-domain/offices/domain';
import { NewsArticle } from 'lib/shared-domain/newsArticle/domain';
import { Transaction } from 'lib/shared-domain/transactions/domain';

export const OfficeCDINews: React.FC<{
  office: Office;
  newsArticles: NewsArticle[];
  transactions: Transaction[];
  content: any;
}> = ({ office, newsArticles, transactions, content }) => {
  const filteredTransactions = transactions.filter(
    (t) => t.location && t.location?._id === office._id && t.hasCDIRelation,
  );
  const filteredNewsArticles = newsArticles.filter(
    (n) => n.office && n.office?._id === office._id && n.hasCDIRelation,
  );

  if (filteredTransactions.length === 0 && filteredNewsArticles.length === 0)
    return null;
  return (
    <NewsGrid
      title={content?.title}
      subtitle={content?.subtitle}
      description={content?.description}
      employees={[]}
      news={newsArticles}
      transactions={transactions}
      loadMoreText={content?.allNewsLinkText}
    />
  );
};

export default OfficeCDINews;
