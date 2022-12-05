import { NewsGrid } from 'lib/shared-domain/newsArticle/presentation/NewsGrid';
import { SiteSettings } from 'lib/shared-domain/page/domain';
import { Transaction } from 'lib/shared-domain/transactions/domain';
import React from 'react';

import { NewsArticle } from '../../newsArticle/domain/index';
import { Office } from '../domain';

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
      linkText={content?.linkText}
      title={content?.title}
      subtitle={content?.subtitle}
      loadMoreText={content?.allNewsLinkText}
      description={content?.description}
      employees={[]}
      newsArticles={filteredNewsArticles}
      transactions={filteredTransactions}
    />
  );
};
