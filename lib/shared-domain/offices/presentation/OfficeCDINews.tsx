import { Transaction } from 'lib/shared-domain/transactions/domain';
import React from 'react';

import { NewsArticle } from '../../newsArticle/domain/index';
import { Office } from '../domain';
import { OfficeCDINews as OfficeCDINewsComponent } from 'components/OfficeCDI/OfficeCDINews';

export const OfficeCDINews: React.FC<{
  office: Office;
  newsArticles: NewsArticle[];
  transactions: Transaction[];
  content: any;
}> = ({ office, newsArticles, transactions, content }) => (
  <OfficeCDINewsComponent
    office={office}
    newsArticles={newsArticles}
    transactions={transactions}
    content={content}
  />
);
