import React from 'react';
import { NewsArticle } from '../domain';
import { SiteSettings } from 'lib/shared-domain/page/domain';
// import { Box } from 'components/Layout/Flex/Flex';
import { PageFooter } from 'lib/shared-domain/page/presentation/PageFooter';
import { PageHeader } from 'lib/shared-domain/page/presentation/PageHeader';

import { PageTransition } from 'components/PageTransition';
// import { NewsArticleTeam } from './NewsArticleTeam';
// import { NewsArticleHero } from './NewsArticleHero';
import NewsArticleHero from 'components/NewsArticle/NewsArticleHero';
import NewsArticleTeam from 'components/NewsArticle/NewsArticleTeam';
import { SEO } from 'components/SEO';
// import { NewsEventAbout } from './NewsEventAbout';
// import { NewsEventWhyToAttend } from './NewsEventWhyToAttend';
// import { NewsEventProgram } from './NewsEventProgram';
import { links } from 'lib/links';
import { useRouter } from 'next/router';
// import { IndustryReportSection } from '../../page/presentation/contentModules/IndustryReportSection';

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
      <PageTransition slug={newsEvent._id}>
        <NewsArticleHero newsArticle={newsEvent} />
        {/*{newsEvent?.aboutTheEvent && (*/}
        {/*  <NewsEventAbout newsEvent={newsEvent} content={content} />*/}
        {/*)}*/}

        <NewsArticleTeam
          employees={newsEvent?.eventRefereesSection}
          content={content?.refereeSectionContent}
        />

        {/*{newsEvent?.industryReportSection && (*/}
        {/*  <IndustryReportSection*/}
        {/*    specificContentModule={newsEvent.industryReportSection}*/}
        {/*  />*/}
        {/*)}*/}

        {/* {newsEvent?.eventPartnerRefereesSection &&
          newsEvent?.eventPartnerRefereesSection.map((s, index) => (
            <NewsArticleTeam key={index} partnerSection={s} />
          ))} */}

        {/*<NewsEventProgram content={content} newsEvent={newsEvent} />*/}
        {/*<NewsEventWhyToAttend content={content} newsEvent={newsEvent} />*/}
      </PageTransition>
      <PageFooter siteSettings={siteSettings} />
    </div>
  );
};
