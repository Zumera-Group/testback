import { Locale } from 'lib/locale';
import { SiteSettingsFacade } from '../infrastructure/siteSettings.facade';

export const fetchSiteSettings = async (locale: Locale) => {
  const facade = new SiteSettingsFacade();

  return await facade.getSiteSettings(locale);
};
