import ErrorPage from 'next/error';
import React, { useEffect } from 'react';
import { fetchSiteSettings } from 'lib/shared-domain/page/application/useGetSiteSettings';
import { SiteSettings } from 'lib/shared-domain/page/domain';
import { VTLanding } from '../../lib/shared-domain/valuation-tool/domain/index';
import { useRouter } from 'next/router';
import { usePreviewSubscription } from '../../lib/sanity';
import { filterDataToSingleItem } from '../../lib/shared-domain/page/infrastructure/page.facade';

import { ErrorTrackingBoundary } from 'lib/ErrorTrackingBoundary';
import { SharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { SharedContentFacade } from 'lib/shared-domain/page/infrastructure/sharedContent.facade';
import {
  REVALIDATE_ON_FAILURE_TIME_IN_SECONDS,
  REVALIDATE_ON_SUCCESS_IN_SECONDS,
} from '../../lib/shared-domain/page/constants';
import { fetchLanding } from 'lib/shared-domain/landings/application/useGetVTLanding';
import PageLayout from 'lib/shared-domain/page/presentation/PageLayout';
import { Landings } from 'lib/shared-domain/landings/domain';

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ locale, params, preview = false }) {
  try {
    const { landing, query } = await fetchLanding(locale, params.slug, preview);
    const siteSettings = await fetchSiteSettings(locale);
    let sharedContent = await new SharedContentFacade().getSharedContentFacade(
      locale,
    );

    if (!landing) {
      return {
        redirect: {
          destination: `/${locale}/404`,
        },
      };
    }

    return {
      props: {
        preview,
        query,
        queryParams: params.slug,
        selectedLanding: landing || null,
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
  selectedLanding: Landings;
  siteSettings: SiteSettings;
  sharedContent: any;
}

export default function Index({
  preview,
  query,
  queryParams,
  selectedLanding,
  siteSettings,
  sharedContent,
}: Props): JSX.Element {
  const { data: previewData } = usePreviewSubscription(query, {
    params: { slug: queryParams } ?? {},
    initialData: selectedLanding,
    enabled: preview,
  });

  const previewPage = filterDataToSingleItem(previewData, preview);
  const router = useRouter();

  if (sharedContent) {
    sharedContent.whiteBg = previewPage?.whiteBg || selectedLanding?.whiteBg;
  }

  useEffect(() => {
    if (selectedLanding?.hidePage) {
      router.push(`/${router.locale}/home`);
    }
  }, [selectedLanding?.hidePage, router]);

  useEffect(() => {
    const valueTool = 'valuation-tool';
    if (router.query.slug !== valueTool) {
      sessionStorage.setItem('isLanding', 'true');
    }
  }, [router]);

  if (router.isFallback) {
    return null;
  }

  return (
    <SharedContentContext value={sharedContent}>
      <ErrorTrackingBoundary>
        <PageLayout
          page={previewPage || selectedLanding}
          siteSettings={siteSettings}
          sharedContent={sharedContent}
        />
      </ErrorTrackingBoundary>
    </SharedContentContext>
  );
}
