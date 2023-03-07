import React from 'react';

import { Employee } from '../domain/index';
import NewsGrid from 'components/NewsGrid';
import { NewsArticle } from 'lib/shared-domain/newsArticle/domain';
import { Transaction } from 'lib/shared-domain/transactions/domain';
import { EmployeeNews as ENews } from 'components/Employee/EmployeeNews';
export const EmployeeNews: React.FC<{
  employee: Employee;
  newsArticles: NewsArticle[];
  transactions: Transaction[];
  content: any;
}> = ({ employee, newsArticles, transactions, content }) => (
  <ENews
    employee={employee}
    newsArticles={newsArticles}
    transactions={transactions}
    content={content}
  />
);
