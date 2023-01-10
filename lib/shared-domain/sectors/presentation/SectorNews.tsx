import React from 'react';

import { Transaction } from 'lib/shared-domain/transactions/domain';
import { Employee } from '../../employees/domain/index';
import { NewsArticle } from '../../newsArticle/domain/index';
import { Sector } from '../../page/domain/index';

import { SectorNews as SNews } from 'components/Sector';

export const SectorNews: React.FC<{
  employees: Employee[];
  newsArticles: NewsArticle[];
  transactions: Transaction[];
  sector: Sector;
  content: any;
}> = ({ employees, newsArticles, transactions, sector, content }) => {
  return (
    <SNews
      employees={employees}
      newsArticles={newsArticles}
      transactions={transactions}
      sector={sector}
      content={content}
    />
  );
};
