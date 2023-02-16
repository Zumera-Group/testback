import { fetchPage } from 'lib/shared-domain/page/application/useGetPage';
import { Page, SiteSettings } from 'lib/shared-domain/page/domain';
import PageLayout from 'lib/shared-domain/page/presentation/PageLayout';
import { ErrorTrackingBoundary } from 'lib/ErrorTrackingBoundary';
import { SharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { useRouter } from 'next/router';
// import { usePreviewSubscription } from '../lib/sanity';
import { filterDataToSingleItem } from '../lib/shared-domain/page/infrastructure/page.facade';
import { enPaths as en, dePaths as de } from '../lib/shared-domain/page/paths';
import { REVALIDATE_ON_SUCCESS_IN_SECONDS } from '../lib/shared-domain/page/constants';
import { lazy, useEffect, useState } from 'react';
import { SecretKeyLockScreen } from 'components/SecretKeyLockScreen';
import { usePreview } from 'lib/sanity';
import { PreviewSuspense } from 'next-sanity/preview';
import { DocumentsCount } from 'components/DocumentsCount';
const PreviewDocumentsCount = lazy(
  () => import('components/PreviewDocumentCount'),
);

export async function getStaticPaths() {
  const enPaths = en.map((slug) => ({
    params: { slug },
    locale: 'en',
  }));

  const dePaths = de.map((slug) => ({
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
    const data = await fetchPage(locale, params.slug, preview);

    const { page, query, siteSettings, sharedContent } = data;

    if (!page) {
      return {
        redirect: {
          destination: `/${locale}/404`,
        },
      };
    }

    return {
      props: {
        preview,
        page: page || null,
        query,
        queryParams: params.slug,
        siteSettings,
        sharedContent,
      },
      revalidate: REVALIDATE_ON_SUCCESS_IN_SECONDS,
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
  page: Page;
  siteSettings: SiteSettings;
  sharedContent: any;
}

export default function Index({
  preview,
  query,
  queryParams,
  page,
  siteSettings,
  sharedContent,
}: Props): JSX.Element {
  // const { data: previewData } = usePreview(null, query);

  const previewPage = filterDataToSingleItem(page, preview);

  const router = useRouter();

  useEffect(() => {
    if (router.query.slug === 'about-us') {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant' as any,
        });
      }, 0);
    }
  }, [router.query.slug]);

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

  if (
    siteSettings &&
    siteSettings &&
    siteSettings?.isUnderSecretKey &&
    !isSecretOpen
  ) {
    return <SecretKeyLockScreen siteSettings={siteSettings} />;
  }

  //  if (preview) {
  //   return (
  //     <PreviewSuspense fallback={<DocumentsCount data={data} />}>
  //       <PreviewDocumentsCount />
  //     </PreviewSuspense>
  //   )
  // }

  return (
    <SharedContentContext value={sharedContent}>
      <ErrorTrackingBoundary>
        <PageLayout
          page={previewPage || page}
          siteSettings={siteSettings}
          sharedContent={sharedContent}
        />
      </ErrorTrackingBoundary>
    </SharedContentContext>
  );
}
