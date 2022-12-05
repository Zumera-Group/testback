import { Locale } from 'lib/locale';
import { EmployeeFacade } from '../infrastructure/employee.facade';

export const fetchEmployeeDetailContent = async (locale: Locale) => {
  const facade = new EmployeeFacade();

  return await facade.getEmployeeDetailContent(locale);
};
