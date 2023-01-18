import React from 'react';

import { Employee } from '../domain/index';
import { EmployeeTeam } from 'components/Employee';

export const EmployeeMoreMembers: React.FC<{
  employee: Employee;
  employees: Employee[];
  content: any;
}> = ({ employee, employees, content }) => {
  return (
    <EmployeeTeam employee={employee} employees={employees} content={content} />
  );
};
