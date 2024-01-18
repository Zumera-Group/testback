import React, { useEffect, useState } from 'react';

import { fetchSiteSettings } from 'lib/shared-domain/page/application/useGetSiteSettings';
import { SiteSettings } from 'lib/shared-domain/page/domain';
import { BlogArticle } from 'lib/shared-domain/blogArticle/domain';
import { fetchBlogArticles } from 'lib/shared-domain/blogValToolArticle/application/useGetBlogArticles';
import { fetchBlogDetailContent } from 'lib/shared-domain/blogArticle/application/useGetBlogDetailContent';
import { fetchBlogArticle } from 'lib/shared-domain/blogValToolArticle/application/useGetBlogArticle';
import { ErrorTrackingBoundary } from 'lib/ErrorTrackingBoundary';
import { SharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { SharedContentFacade } from 'lib/shared-domain/page/infrastructure/sharedContent.facade';
import { useRouter } from 'next/router';
import { usePreviewSubscription } from '../../lib/sanity';
import { links } from 'lib/links';
import { REVALIDATE_ON_FAILURE_TIME_IN_SECONDS } from '../../lib/shared-domain/page/constants';
import { SecretKeyLockScreen } from 'components/SecretKeyLockScreen';
import { BlogArticleLayout } from 'components/BlogArticleLayout';

export async function getStaticPaths() {
  const en = await fetchBlogArticles('en');
  const de = await fetchBlogArticles('de');

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
    const { blogArticle, query } = await fetchBlogArticle(
      locale,
      params.slug,
      //   preview,
    );

    if (!blogArticle) {
      return {
        redirect: {
          destination: `/${locale}/404`,
        },
      };
    }

    const siteSettings = await fetchSiteSettings(locale);

    // const content = await fetchNewsArticleDetailContent(locale);
    const sharedContent =
      await new SharedContentFacade().getSharedContentFacade(locale);

    const blogDetailContent = await fetchBlogDetailContent(locale);

    return {
      props: {
        // preview,
        query,
        queryParams: params.slug,
        selectedBlogArticle: blogArticle || null,
        siteSettings,
        // content,
        blogDetailContent,
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
  //   preview: boolean;
  query: string;
  queryParams: string;
  selectedBlogArticle: BlogArticle;
  siteSettings: SiteSettings;
  //   content: any;
  sharedContent: any;
  blogDetailContent: any;
}

export default function Index({
  //   preview,
  query,
  queryParams,
  selectedBlogArticle,
  siteSettings,
  //   content,
  sharedContent,
  blogDetailContent,
}: Props): JSX.Element {
  const { data: previewData } = usePreviewSubscription(query, {
    params: { slug: queryParams } ?? {},
    initialData: selectedBlogArticle,
    // enabled: preview,
  });
  //   const previewNewsArticle = filterDataToSingleItem(previewData, preview);

  const router = useRouter();

  const { locale } = useRouter();

  const [isSecretOpen, setIsSecretOpen] = useState(
    !siteSettings?.isUnderSecretKey,
  );
  useEffect(() => {
    if (localStorage.getItem('secretKeyOpen')) {
      setIsSecretOpen(true);
    }
  }, []);

  //   useEffect(() => {
  //     if (selectedBlogArticle?.hidePage) {
  //       router.push(`/${router.locale}/home`);
  //     }
  //   }, [selectedBlogArticle?.hidePage, router]);

  if (router.isFallback) {
    return null;
  }

  if (siteSettings && siteSettings?.isUnderSecretKey && !isSecretOpen) {
    return <SecretKeyLockScreen siteSettings={siteSettings} />;
  }

  const otherLangSlug =
    selectedBlogArticle?.queryOtherLangSlug?.slice(-1)[0]?.slug &&
    links(locale === 'en' ? 'de' : 'en').blogValToolArticle(
      selectedBlogArticle?.queryOtherLangSlug?.slice(-1)[0] as any,
    );


  return (
    <ErrorTrackingBoundary>
      <SharedContentContext value={sharedContent}>
        <BlogArticleLayout
          siteSettings={siteSettings}
          blogArticle={selectedBlogArticle}
          blogArticleDetail={blogDetailContent}
          querySlug={otherLangSlug}
        />
      </SharedContentContext>
    </ErrorTrackingBoundary>
  );
}
