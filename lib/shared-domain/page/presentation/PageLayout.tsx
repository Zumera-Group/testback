import React from 'react';
import dynamic from 'next/dynamic';

import { Page, Sector, Service, SiteSettings } from '../domain/index';
import { ContentModule } from '../domain/contentModule';
import { getContentForContentModule } from './contentModules';
import { PageHeader } from './PageHeader';
import { Employee } from 'lib/shared-domain/employees/domain';
import { NewsArticle } from 'lib/shared-domain/newsArticle/domain';
import { Transaction } from 'lib/shared-domain/transactions/domain';
import { PageTransition } from 'components/PageTransition';
import { Office } from './../../offices/domain/index';
import { SEO } from 'components/SEO';
import { Job } from 'lib/shared-domain/jobs/domain';
import { useRouter } from 'next/router';
const PageFooter = dynamic(() => import('./PageFooter'));

const PageLayout: React.FC<{
  page: Page;
  siteSettings: SiteSettings;
  sharedContent?: any;
}> = ({ page, siteSettings, sharedContent }) => {
  const PageFooterComponent = PageFooter as any;

  const contentModules =
    page?.contentModules?.map((c) => ContentModule.create(c)) || [];

  const { locale } = useRouter();

  const otherLangSlug =
    page?.queryOtherLangSlug?.slice(-1)[0]?.slug &&
    `/${locale === 'en' ? 'de' : 'en'}/${
      page?.queryOtherLangSlug?.slice(-1)[0]?.slug?.current
    }`;

  return (
    <>
      <SEO
        seoTitle={page.seoTitle}
        seoDescription={page.seoDescription}
        seoImage={page.seoImage}
        siteSettings={siteSettings}
      />
      <PageTransition slug={page.slug?.current}>
        <PageHeader
          contentModules={contentModules}
          siteSettings={siteSettings}
          otherLangSlug={otherLangSlug}
          hideHeader={page.isHeaderRoutesHidden}
        />
        <main id="main">
          {contentModules &&
            contentModules.map((c) => {
              return (
                <React.Fragment key={c._key}>
                  {getContentForContentModule(
                    c,
                    siteSettings,
                    sharedContent,
                    contentModules,
                  )}
                </React.Fragment>
              );
            })}
        </main>

        {!page.isFooterHidden ? (
          <PageFooterComponent
            siteSettings={{
              ...siteSettings,
              hideFooterSitemap: page.hideFooterSitemap,
            }}
          />
        ) : null}
      </PageTransition>
    </>
  );
};

export default PageLayout;
