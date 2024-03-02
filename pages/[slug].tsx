import { fetchPage } from 'lib/shared-domain/page/application/useGetPage';
import { Page, SiteSettings } from 'lib/shared-domain/page/domain';
import PageLayout from 'lib/shared-domain/page/presentation/PageLayout';
import { ErrorTrackingBoundary } from 'lib/ErrorTrackingBoundary';
import { SharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { useRouter } from 'next/router';
import { usePreviewSubscription } from '../lib/sanity';
import {filterDataToSingleItem, PageFacade} from '../lib/shared-domain/page/infrastructure/page.facade';
// import {
//   enPaths as en,
//   dePaths as de,
//   frPaths as fr,
// } from '../lib/shared-domain/page/paths';
import { REVALIDATE_ON_SUCCESS_IN_SECONDS } from '../lib/shared-domain/page/constants';
import { useEffect, useState } from 'react';
import { SecretKeyLockScreen } from 'components/SecretKeyLockScreen';
import {SanityService} from '../lib/services/sanity.service';

export async function getStaticPaths() {
  const facade = new PageFacade();
  const pages = await facade.getPagesForStaticPaths();

  const paths: {params: {slug: string}, locale: string}[] = pages.map(({_lang, slug}) => ({
    params: {
      slug: slug.current,
    },
    locale: SanityService.getLocaleFromSanityLocale(_lang)
  }));

  // const enPaths = en.map((slug) => ({
  //   params: { slug },
  //   locale: 'en',
  // }));
  //
  // const dePaths = de.map((slug) => ({
  //   params: { slug },
  //   locale: 'de',
  // }));
  //
  // const frPaths = fr.map((slug) => ({
  //   params: { slug },
  //   locale: 'fr',
  // }));

  return {
    paths,
    // paths: [...enPaths, ...dePaths, ...frPaths],
    fallback: true
  };
}

export async function getStaticProps({ locale, params, preview = false }) {
  try {
    const data = await fetchPage(locale, params.slug, preview);

    const { page, query, siteSettings = {}, sharedContent } = data;

    if (!page) {
      return {
        notFound: true,
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
  const { data: previewData } = usePreviewSubscription(query, {
    params: { slug: queryParams } ?? {},
    initialData: page,
    enabled: preview,
  });
  const previewPage = filterDataToSingleItem(previewData, preview);
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

  // FIXME: this is actually a bug - if a page isn't in cache (isFallback == true) - it leads to 404, but should be resolved with a page.
  // useEffect(() => {
  //   if (router.isFallback) {
  //     console.log(router, 'router.isFallback');
  //     router.push(`/${router.locale}/404`);
  //   }
  // }, [router]);

  useEffect(() => {
    if (page?.hidePage) {
      router.push(`/${router.locale}/home`);
      return;
    }
  }, [page, router]);

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

  return (
    <SharedContentContext value={sharedContent || {}}>
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
