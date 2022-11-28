import { Locale } from 'lib/locale';
import { OfficeFacade } from '../infrastructure/office.facade';

export const fetchCDIOfficeDetailContent = async (locale: Locale) => {
  const facade = new OfficeFacade();

  return await facade.getDetailContent(locale);
};
