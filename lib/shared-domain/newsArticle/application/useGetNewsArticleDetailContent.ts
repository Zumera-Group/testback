import { Locale } from 'lib/locale';
import { NewsArticleFacade } from '../infrastructure/newsArticle.facade';

export const fetchNewsArticleDetailContent = async (locale: Locale) => {
  const facade = new NewsArticleFacade();

  return await facade.getDetailContent(locale);
};
