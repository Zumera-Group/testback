import { Locale } from 'lib/locale';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BlogArticleFacade } from '../infrastructure/blogArticle.facade';

export const fetchBlogArticles = async (locale: Locale) => {
  const facade = new BlogArticleFacade();

  return await facade.getBlogArticles(locale);
};

export const useFetchBlogArticles = () => {
  const router = useRouter();
  const [blogArticles, setBlogArticles] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchBlogArticles(router.locale as any).then((t) => {
        setBlogArticles(t);
      });
    }
  }, []);

  return blogArticles;
};
