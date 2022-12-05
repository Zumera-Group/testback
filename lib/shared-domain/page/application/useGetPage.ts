import { Locale } from 'lib/locale';
import { PageFacade } from '../infrastructure/page.facade';

export const fetchPage = async (
  locale: Locale,
  slug: string,
  preview?: boolean,
) => {
  const facade = new PageFacade();

  return await facade.getPage(locale, slug, preview);
};

export const useGetPage = async (locale: Locale, slug: string) => {
  const site = await fetchPage(locale, slug);

  return { site };
};
