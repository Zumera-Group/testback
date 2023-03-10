import { Locale } from 'lib/locale';
import { ServiceFacade } from '../infrastructure/service.facade';

export const fetchServices = async (locale: Locale) => {
  const facade = new ServiceFacade();

  return await facade.getServices(locale);
};
