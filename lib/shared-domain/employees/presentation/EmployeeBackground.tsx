import React from 'react';

import { Employee } from '../domain/index';
import { EmployeeBackground as EBackground } from 'components/Employee/EmployeeBackground';

export const EmployeeBackground: React.FC<{
  employee: Employee;
  content: any;
}> = ({ employee, content }) => {
  return <EBackground employee={employee} content={content} />;
};
