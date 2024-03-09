import React from 'react';
import { NewsArticle } from '../domain';
import { SiteSettings } from 'lib/shared-domain/page/domain';
import { PageFooter } from 'lib/shared-domain/page/presentation/PageFooter';
import { PageHeader } from 'lib/shared-domain/page/presentation/PageHeader';
import { PageTransition } from 'components/PageTransition';
import NewsArticleHero from 'components/NewsArticle/NewsArticleHero';
import NewsArticleTeam from 'components/NewsArticle/NewsArticleTeam';
import { SEO } from 'components/SEO';
import { links } from 'lib/links';
import { useRouter } from 'next/router';

export const NewsEventDetailLayout: React.FC<{
  newsEvent: NewsArticle;
  siteSettings: SiteSettings;
  content: any;
}> = ({ newsEvent, siteSettings, content }) => {
  const { locale } = useRouter();
  const otherLangSlug =
    newsEvent?.queryOtherLangSlug?.slice(-1)[0]?.slug &&
    links(locale === 'en' ? 'de' : 'en').newsArticles(
      newsEvent?.queryOtherLangSlug?.slice(-1)[0] as any,
    );
  return (
    <div>
      <SEO
        seoTitle={newsEvent.title}
        seoDescription={newsEvent.subtitle}
        siteSettings={siteSettings}
        seoImage={newsEvent.picture}
      />
      <PageHeader
        contentModules={[]}
        siteSettings={siteSettings}
        otherLangSlug={otherLangSlug}
      />
      <PageTransition>
        <NewsArticleHero newsArticle={newsEvent} />
        <NewsArticleTeam
          employees={newsEvent?.eventRefereesSection}
          content={content?.refereeSectionContent}
        />
      </PageTransition>
      <PageFooter siteSettings={siteSettings} />
    </div>
  );
};
