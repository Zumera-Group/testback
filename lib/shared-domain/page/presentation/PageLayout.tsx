import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

import { Page, SiteSettings } from '../domain/index';
import { ContentModule } from '../domain/contentModule';
import { getContentForContentModule } from './contentModules';
import { PageHeader } from './PageHeader';
import { PageTransition } from 'components/PageTransition';
import { SEO } from 'components/SEO';
import {useMakeAlternateHrefs} from "../../../hooks/useMakeAlternateHrefs";
import {locales} from "../../../locale";
import {allLinks} from "../../../links";
const PageFooter = dynamic(() => import('./PageFooter'));

const PageLayout: React.FC<{
  page: Page;
  siteSettings: SiteSettings;
  sharedContent?: any;
}> = ({ page, siteSettings, sharedContent }) => {
  const PageFooterComponent = PageFooter as any;

  const contentModules =
    page?.contentModules?.map((c) => ContentModule.create(c)) || [];

  // const { locale } = useRouter();
  const {alternateHrefs} = useMakeAlternateHrefs({
    doc: page,
    urlPrefixes: page._type == 'landings' ? getAllLandingPrefixes() : null
  });

  // const otherLangSlug =
  //   page?.queryOtherLangSlug?.slice(-1)[0]?.slug &&
  //   `/${locale === 'en' ? 'de' : 'en'}/${
  //     page?.queryOtherLangSlug?.slice(-1)[0]?.slug?.current
  //   }`;

  return (
    <>
      <SEO
        seoTitle={page.seoTitle}
        seoDescription={page.seoDescription}
        seoImage={page.seoImage}
        siteSettings={siteSettings}
        langAlternates={alternateHrefs}
      />
      <PageTransition>
        <PageHeader
          contentModules={contentModules}
          siteSettings={siteSettings}
          // otherLangSlug={otherLangSlug}
          hideHeader={page.isHeaderRoutesHidden}
          hideMenu={page.hideNavMenu}
          darkBg={page.darkBg}
          whiteBg={page.whiteBg}
          langAlternates={alternateHrefs}
        />
        <Suspense fallback={() => <div>loading</div>}>
          <main id="main" className={page.whiteBg && 'white-bg'}>
            {contentModules &&
              contentModules.map((c) => {
                return (
                  <React.Fragment key={c._key}>
                    {getContentForContentModule(
                      c,
                      {
                        ...siteSettings,
                        hideFooterSitemap: page.hideFooterSitemap,
                      },
                      sharedContent,
                      contentModules,
                    )}
                  </React.Fragment>
                );
              })}
          </main>
        </Suspense>

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

const getAllLandingPrefixes = () => {
  const out: {[key: string]: string} = {};

  for (const [key, val] of Object.entries(allLinks.landing)) {
    out[key] = `/${val}`;
  }

  return out;
};