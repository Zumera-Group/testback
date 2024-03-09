import React, { Suspense, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';

import { Page, SiteSettings } from '../domain/index';
import { ContentModule } from '../domain/contentModule';
import { getContentForContentModule } from './contentModules';
import { PageHeader } from './PageHeader';
import { PageTransition } from 'components/PageTransition';
import { SEO } from 'components/SEO';
import { useRouter } from 'next/router';
import { IAlternateLangHrefs, ILangRef } from '../../../../@types/i18n';
import { SanityService } from '../../../services/sanity.service';
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
  const {alternateHrefs} = useMakeAlternateHrefs({page});

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
        langAlternates={alternateHrefs}
      />
      <PageTransition>
        <PageHeader
          contentModules={contentModules}
          siteSettings={siteSettings}
          otherLangSlug={otherLangSlug}
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

const useMakeAlternateHrefs = ({ page }: { page: Page }) => {
  const makeAlternates = useCallback((lang: string, langRefs: ILangRef[]) => {
    const alternates: IAlternateLangHrefs = {};

    for (const { _lang, slug } of langRefs) {
      if (lang != _lang && slug) {
        const siteLocale = SanityService.getLocaleFromSanityLocale(_lang);

        let href = '';
        if (page._type == 'landings') {
          href = `/${siteLocale}/landing/${slug.current}`;
        } else {
          href = `/${siteLocale}/${slug.current}`;
        }

        Object.assign(alternates, {
          [siteLocale]: href,
        });
      }
    }

    return alternates;
  }, []);

  const alternateHrefs = useMemo(() => {
    if (page.__i18n_base && Array.isArray(page.__i18n_base._langRefs) && page._lang) {
      const langRefs: ILangRef[] = page.__i18n_base._langRefs.filter(
        (ref) => ref !== null,
      );

      langRefs.push({
        _id: page.__i18n_base._id,
        _lang: page.__i18n_base._lang,
        slug: page.__i18n_base.slug,
      });

      return makeAlternates(page._lang, langRefs);
    } else if (Array.isArray(page._langRefs) && page._langRefs[0] !== null && page._lang) {
      const langRefs = page._langRefs.filter((ref) => ref !== null);
      return makeAlternates(page._lang, langRefs);
    }

    return {};
  }, [page, makeAlternates]);

  return { alternateHrefs };
};
