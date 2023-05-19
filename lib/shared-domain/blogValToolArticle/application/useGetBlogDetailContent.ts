import { Locale } from 'lib/locale';
import { BlogArticleFacade } from '../infrastructure/blogArticle.facade';

export const fetchBlogDetailContent = async (locale: Locale) => {
  const facade = new BlogArticleFacade();

  return await facade.getBlogDetailContent(locale);
};
