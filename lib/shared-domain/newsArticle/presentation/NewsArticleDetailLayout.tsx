import React from 'react';
import { NewsArticle } from '../domain';
import { SiteSettings } from 'lib/shared-domain/page/domain';
import { PageFooter } from 'lib/shared-domain/page/presentation/PageFooter';
import { PageHeader } from 'lib/shared-domain/page/presentation/PageHeader';

import { PageTransition } from 'components/PageTransition';
import { SEO } from 'components/SEO';
import { useFetchNewsArticles } from '../application/useGetNewsArticles';
import { useFetchEmployees } from '../../employees/application/useGetEmployees';
import { links } from 'lib/links';
import { useRouter } from 'next/router';

import NewsArticleHero from 'components/NewsArticle/NewsArticleHero';
import NewsArticleDescription from 'components/NewsArticle/NewsArticleDescription';
import NewsArticleTeam from 'components/NewsArticle/NewsArticleTeam';
import NewsArticleMoreNews from 'components/NewsArticle/NewsArticleMoreNews';

export const NewsArticleDetailLayout: React.FC<{
  newsArticle: NewsArticle;
  siteSettings: SiteSettings;
  content: any;
}> = ({ newsArticle, siteSettings, content }) => {
  const newsArticles = useFetchNewsArticles();
  const employees = useFetchEmployees();
  const filteredNewsArticles = newsArticles.filter(
    (n) => n._id !== newsArticle._id,
  );
  const { locale } = useRouter();

  const otherLangSlug =
    newsArticle?.queryOtherLangSlug?.slice(-1)[0]?.slug &&
    links(locale === 'en' ? 'de' : 'en').newsArticles(
      newsArticle?.queryOtherLangSlug?.slice(-1)[0] as any,
    );

  return (
    <div>
      <SEO
        seoTitle={newsArticle.title}
        seoDescription={newsArticle.subtitle}
        siteSettings={siteSettings}
        seoImage={newsArticle.picture}
      />
      <PageHeader
        contentModules={[]}
        siteSettings={siteSettings}
        otherLangSlug={otherLangSlug}
      />
      <PageTransition>
        <NewsArticleHero newsArticle={newsArticle} />
        <NewsArticleDescription
          newsArticle={newsArticle}
          content={content?.articleTextSectionContent}
        />
        {newsArticle?.team && !!newsArticle?.team.length && (
          <NewsArticleTeam
            employees={newsArticle?.team}
            content={content?.teamSectionContent}
          />
        )}
        <NewsArticleMoreNews
          newsArticles={filteredNewsArticles}
          employees={employees}
          content={content?.newsSectionContent}
        />
      </PageTransition>
      <PageFooter siteSettings={siteSettings} />
    </div>
  );
};
