import { Locale } from 'lib/locale';
import { ServiceFacade } from '../infrastructure/service.facade';

export const fetchServiceDetail = async (
  locale: Locale,
  slug: string,
  preview?: boolean,
) => {
  const facade = new ServiceFacade();

  return await facade.getServiceDetail(locale, slug, preview);
};
