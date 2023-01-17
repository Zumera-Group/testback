import React from 'react';

import { Employee } from '../domain/index';
import TransactionsSelected from 'components/Transaction/TransactionsSelected/TransactionsSelected';
import { EmployeeHero as EHero } from 'components/Employee/EmployeeHero/EmployeeHero';

export const EmployeeHero: React.FC<{ employee: Employee; content: any }> = ({
  employee,
  content,
}) => {
  return <EHero employee={employee} content={content} />;
};
