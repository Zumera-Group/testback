import { Locale } from 'lib/locale';
import { EmployeeFacade } from '../infrastructure/employee.facade';

export const fetchEmployee = async (
  locale: Locale,
  slug: string,
  preview = false,
) => {
  const facade = new EmployeeFacade();

  return await facade.getEmployee(locale, slug, preview);
};
