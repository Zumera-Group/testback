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

export const useGetEmployee = async (locale: Locale, slug: string) => {
  const employee = await fetchEmployee(locale, slug);

  return { employee };
};
