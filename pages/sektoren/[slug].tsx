import {
  fetchSectorDetail,
  fetchSectorDetailContent,
} from 'lib/shared-domain/sectors/application/useGetSectorDetail';
import React, { useEffect, useState } from 'react';
import { fetchSiteSettings } from 'lib/shared-domain/page/application/useGetSiteSettings';
import { Sector, SiteSettings } from 'lib/shared-domain/page/domain';
import { SectorDetailLayout } from 'lib/shared-domain/sectors/presentation/SectorDetailLayout';
import { ErrorTrackingBoundary } from 'lib/ErrorTrackingBoundary';
import { SharedContentFacade } from 'lib/shared-domain/page/infrastructure/sharedContent.facade';
import { SharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { useRouter } from 'next/router';
// import { usePreviewSubscription } from '../../lib/sanity';
import { filterDataToSingleItem } from '../../lib/shared-domain/page/infrastructure/page.facade';

import {
  REVALIDATE_ON_FAILURE_TIME_IN_SECONDS,
  REVALIDATE_ON_SUCCESS_IN_SECONDS,
} from '../../lib/shared-domain/page/constants';
import { SecretKeyLockScreen } from 'components/SecretKeyLockScreen';

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({
  locale: localeFromRoute,
  params,
  preview = false,
}) {
  try {
    const locale = 'de';
    const siteSettings = await fetchSiteSettings(locale);
    const sharedContent =
      await new SharedContentFacade().getSharedContentFacade(locale);
    if (localeFromRoute !== locale) {
      return {
        redirect: {
          destination: `/${locale}/404`,
        },
      };
    }
    const { sectorDetail: selectedSector, query } = await fetchSectorDetail(
      locale,
      params.slug,
      preview,
    );

    if (!selectedSector) {
      return {
        redirect: {
          destination: `/${locale}/404`,
        },
      };
    }

    const content = await fetchSectorDetailContent(locale);

    return {
      props: {
        preview,
        query,
        queryParams: params.slug,
        selectedSector: selectedSector || null,
        siteSettings,
        content,
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
  selectedSector: Sector;
  siteSettings: SiteSettings;
  content: any;
  sharedContent: any;
}

export default function Index({
  preview,
  query,
  queryParams,
  selectedSector,
  siteSettings,
  content,
  sharedContent,
}: Props): JSX.Element {
  // const { data: previewData } = usePreviewSubscription(query, {
  //   params: { slug: queryParams } ?? {},
  //   initialData: selectedSector,
  //   enabled: preview,
  // });
  const previewSector = filterDataToSingleItem(selectedSector, preview);

  const router = useRouter();

  const [isSecretOpen, setIsSecretOpen] = useState(
    !siteSettings?.isUnderSecretKey,
  );
  useEffect(() => {
    if (localStorage.getItem('secretKeyOpen')) {
      setIsSecretOpen(true);
    }
  }, []);

  useEffect(() => {
    if (selectedSector?.hidePage) {
      router.push(`/${router.locale}/home`);
    }
  }, [selectedSector?.hidePage, router]);

  if (router.isFallback) {
    return null;
  }

  if (siteSettings && siteSettings?.isUnderSecretKey && !isSecretOpen) {
    return <SecretKeyLockScreen siteSettings={siteSettings} />;
  }

  return (
    <SharedContentContext value={sharedContent}>
      <ErrorTrackingBoundary>
        <SectorDetailLayout
          siteSettings={siteSettings}
          sector={previewSector || selectedSector}
          content={content}
          sharedContent={sharedContent}
        />
      </ErrorTrackingBoundary>
    </SharedContentContext>
  );
}
