import { Locale } from 'lib/locale';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NewsArticleFacade } from '../infrastructure/newsArticle.facade';

export const fetchNewsArticles = async (locale: Locale) => {
  const facade = new NewsArticleFacade();

  return await facade.getNewsArticles(locale);
};

export const useFetchNewsArticles = () => {
  const router = useRouter();
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchNewsArticles(router.locale as any).then((t) => {
        setNewsArticles(t);
      });
    }
  }, []);

  return newsArticles;
};
