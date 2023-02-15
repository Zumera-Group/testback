import React, { useEffect, useState } from 'react';

import { fetchSiteSettings } from 'lib/shared-domain/page/application/useGetSiteSettings';
import { SiteSettings } from 'lib/shared-domain/page/domain';
import { NewsArticle } from 'lib/shared-domain/newsArticle/domain';
import { fetchNewsArticles } from 'lib/shared-domain/newsArticle/application/useGetNewsArticles';
import { NewsArticleDetailLayout } from 'lib/shared-domain/newsArticle/presentation/NewsArticleDetailLayout';
import { fetchNewsArticle } from 'lib/shared-domain/newsArticle/application/useGetNewsArticle';
import { ErrorTrackingBoundary } from 'lib/ErrorTrackingBoundary';
import { fetchNewsArticleDetailContent } from 'lib/shared-domain/newsArticle/application/useGetNewsArticleDetailContent';
import { NewsEventDetailLayout } from '../../lib/shared-domain/newsArticle/presentation/NewsEventDetailLayout';
import { SharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { SharedContentFacade } from 'lib/shared-domain/page/infrastructure/sharedContent.facade';
import { useRouter } from 'next/router';
import { EmployeeHero } from 'lib/shared-domain/employees/presentation/EmployeeHero';
import { filterDataToSingleItem } from '../../lib/shared-domain/page/infrastructure/page.facade';
// import { usePreviewSubscription } from '../../lib/sanity';

import { REVALIDATE_ON_FAILURE_TIME_IN_SECONDS } from '../../lib/shared-domain/page/constants';
import { SecretKeyLockScreen } from 'components/SecretKeyLockScreen';

export async function getStaticPaths() {
  const en = await fetchNewsArticles('en');
  const de = await fetchNewsArticles('de');

  const mapSlugsEn = en
    .map((data) => data?.slug?.current)
    .filter((data) => data)
    .slice(0, 10);
  const mapSlugsDe = de
    .map((data) => data?.slug?.current)
    .filter((data) => data)
    .slice(0, 10);

  const enPaths = mapSlugsEn.map((slug) => ({
    params: { slug },
    locale: 'en',
  }));

  const dePaths = mapSlugsDe.map((slug) => ({
    params: { slug },
    locale: 'de',
  }));

  return {
    paths: [...enPaths, ...dePaths],
    fallback: true,
  };
}

export async function getStaticProps({ locale, params, preview = false }) {
  try {
    const { newsArticle, query } = await fetchNewsArticle(
      locale,
      params.slug,
      preview,
    );

    if (!newsArticle) {
      return {
        redirect: {
          destination: `/${locale}/404`,
        },
      };
    }
    const siteSettings = await fetchSiteSettings(locale);
    const content = await fetchNewsArticleDetailContent(locale);
    const sharedContent =
      await new SharedContentFacade().getSharedContentFacade(locale);

    return {
      props: {
        preview,
        query,
        queryParams: params.slug,
        selectedNewsArticle: newsArticle || null,
        siteSettings,
        content,
        sharedContent,
      },
      revalidate: REVALIDATE_ON_FAILURE_TIME_IN_SECONDS,
    };
  } catch (e) {
    console.log(e);
    return { notFound: true, revalidate: 10 };
  }
}

interface Props {
  preview: boolean;
  query: string;
  queryParams: string;
  selectedNewsArticle: NewsArticle;
  siteSettings: SiteSettings;
  content: any;
  sharedContent: any;
}

export default function Index({
  preview,
  query,
  queryParams,
  selectedNewsArticle,
  siteSettings,
  content,
  sharedContent,
}: Props): JSX.Element {
  // const { data: previewData } = usePreviewSubscription(query, {
  //   params: { slug: queryParams } ?? {},
  //   initialData: selectedNewsArticle,
  //   enabled: preview,
  // });
  const previewNewsArticle = filterDataToSingleItem(
    selectedNewsArticle,
    preview,
  );

  const router = useRouter();

  const [isSecretOpen, setIsSecretOpen] = useState(
    !siteSettings?.isUnderSecretKey,
  );
  useEffect(() => {
    if (localStorage.getItem('secretKeyOpen')) {
      setIsSecretOpen(true);
    }
  }, []);

  if (router.isFallback) {
    return null;
  }

  if (siteSettings && siteSettings?.isUnderSecretKey && !isSecretOpen) {
    return <SecretKeyLockScreen siteSettings={siteSettings} />;
  }

  return (
    <ErrorTrackingBoundary>
      {selectedNewsArticle?.isEvent ? (
        <SharedContentContext value={sharedContent}>
          <NewsEventDetailLayout
            siteSettings={siteSettings}
            newsEvent={previewNewsArticle || selectedNewsArticle}
            content={content}
          />
        </SharedContentContext>
      ) : (
        <SharedContentContext value={sharedContent}>
          <NewsArticleDetailLayout
            siteSettings={siteSettings}
            newsArticle={previewNewsArticle || selectedNewsArticle}
            content={content}
          />
        </SharedContentContext>
      )}
    </ErrorTrackingBoundary>
  );
}
