import { Locale } from 'lib/locale';
import { LandingsFacade } from 'lib/shared-domain/landings/infrastructure/landings.facade';
import { Landings } from '../domain/index';

export const fetchLanding = async (
  locale: Locale,
  slug: string,
  params?: boolean,
): Promise<{ landing: Landings; query: string }> => {
  const facade = new LandingsFacade();
  return await facade.getLanding(locale, slug, params);
};
