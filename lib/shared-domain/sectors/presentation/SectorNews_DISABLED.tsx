import { NewsGrid } from 'lib/shared-domain/newsArticle/presentation/NewsGrid';
import { Transaction } from 'lib/shared-domain/transactions/domain';
import React from 'react';
import { Employee } from '../../employees/domain/index';
import { NewsArticle } from '../../newsArticle/domain/index';
import { Sector } from '../../page/domain/index';

const filterBySector = (e, sector) =>
  !!e?.sectors?.filter((s) => s?.id === sector?.id)?.length;

export const SectorNews: React.FC<{
  employees: Employee[];
  newsArticles: NewsArticle[];
  transactions: Transaction[];
  sector: Sector;
  content: any;
}> = ({ employees, newsArticles, transactions, sector, content }) => {
  const filteredEmployees = employees.filter((s) => filterBySector(s, sector));

  const t = (item) => content?.[item];

  return (
    <NewsGrid
      linkText={t('linkText')}
      title={t('title')}
      subtitle={t('subtitle')}
      description={t('description')}
      employees={filteredEmployees}
      newsArticles={newsArticles}
      transactions={transactions}
    />
  );
};
