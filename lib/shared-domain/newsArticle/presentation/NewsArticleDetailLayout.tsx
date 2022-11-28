import React from 'react';
import { NewsArticle } from '../domain';
import { SiteSettings } from 'lib/shared-domain/page/domain';
import { Box } from 'components/Layout/Flex/Flex';
import { PageFooter } from 'lib/shared-domain/page/presentation/PageFooter';
import { PageHeader } from 'lib/shared-domain/page/presentation/PageHeader';

import { PageTransition } from 'components/PageTransition';
import { NewsArticleTeam } from './NewsArticleTeam';
import { NewsArticleMoreNews } from './NewsArticleMoreNews';
import { NewsArticleHero } from './NewsArticleHero';
import { NewsArticleDescription } from './NewsArticleDescription';
import { SEO } from 'components/SEO';
import { NewsArticleReportDownload } from './NewsArticleReportDownload';
import { useFetchNewsArticles } from '../application/useGetNewsArticles';
import { useFetchEmployees } from '../../employees/application/useGetEmployees';
import { links } from 'lib/links';
import { useRouter } from 'next/router';
import { IndustryReportSection } from '../../page/presentation/contentModules/IndustryReportSection';

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
    <Box minHeight="100vh" overflowX="hidden">
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
      <PageTransition slug={newsArticle._id}>
        <NewsArticleHero newsArticle={newsArticle} />
        <NewsArticleDescription
          newsArticle={newsArticle}
          content={content?.articleTextSectionContent}
        />
        {newsArticle?.industryReportSection && (
          <IndustryReportSection
            specificContentModule={newsArticle.industryReportSection}
          />
        )}
        <NewsArticleTeam
          employees={newsArticle?.team}
          content={content?.teamSectionContent}
        />
        <NewsArticleReportDownload newsArticle={newsArticle} />
        <NewsArticleMoreNews
          newsArticles={filteredNewsArticles}
          employees={employees}
          content={content?.newsSectionContent}
        />
      </PageTransition>
      <PageFooter siteSettings={siteSettings} />
    </Box>
  );
};
