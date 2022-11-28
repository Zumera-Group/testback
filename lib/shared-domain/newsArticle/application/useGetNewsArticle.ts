import { Locale } from 'lib/locale';
import { NewsArticleFacade } from '../infrastructure/newsArticle.facade';

export const fetchNewsArticle = async (
  locale: Locale,
  slug: string,
  preview?: boolean,
) => {
  const facade = new NewsArticleFacade();

  return await facade.getNewsArticle(locale, slug, preview);
};

export const useGetNewsArticle = async (locale: Locale, slug: string) => {
  const site = await fetchNewsArticle(locale, slug);

  return { site };
};
