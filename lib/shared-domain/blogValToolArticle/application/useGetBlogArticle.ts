import { Locale } from 'lib/locale';
import { BlogArticleFacade } from '../infrastructure/blogArticle.facade';

export const fetchBlogArticle = async (
  locale: Locale,
  slug: string,
  preview?: boolean,
) => {
  const facade = new BlogArticleFacade();

  return await facade.getBlogArticle(locale, slug, preview);
};
