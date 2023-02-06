import React, { useEffect, useState } from 'react';
import { fetchSiteSettings } from 'lib/shared-domain/page/application/useGetSiteSettings';
import { Service, SiteSettings } from 'lib/shared-domain/page/domain';
import { fetchServices } from '../../lib/shared-domain/services/application/useGetServices';
import { ServiceDetailLayout } from 'lib/shared-domain/services/presentation/ServiceDetailLayout';
import { fetchServiceDetail } from '../../lib/shared-domain/services/application/useGetServiceDetail';
import { ErrorTrackingBoundary } from 'lib/ErrorTrackingBoundary';
import { SharedContentFacade } from 'lib/shared-domain/page/infrastructure/sharedContent.facade';
import { SharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { useRouter } from 'next/router';
import { EmployeeHero } from 'lib/shared-domain/employees/presentation/EmployeeHero';
import { usePreviewSubscription } from '../../lib/sanity';
import { filterDataToSingleItem } from '../../lib/shared-domain/page/infrastructure/page.facade';

import {
  REVALIDATE_ON_FAILURE_TIME_IN_SECONDS,
  REVALIDATE_ON_SUCCESS_IN_SECONDS,
} from '../../lib/shared-domain/page/constants';
import { SecretKeyLockScreen } from 'components/SecretKeyLockScreen';

export async function getStaticPaths() {
  const en = await fetchServices('en');

  const mapSlugsEn = en
    .map((data) => data?.slug?.current)
    .filter((data) => data);

  const enPaths = mapSlugsEn.map((slug) => ({
    params: { slug },
    locale: 'en',
  }));

  return {
    paths: [...enPaths],
    fallback: true,
  };
}

export async function getStaticProps({
  locale: localeFromRoute,
  params,
  preview = false,
}) {
  try {
    const locale = 'en';
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
    const { service: serviceDetail, query } = await fetchServiceDetail(
      locale,
      params.slug,
      preview,
    );

    if (!serviceDetail) {
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
        selectedService: serviceDetail || null,
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
  selectedService: Service;
  siteSettings: SiteSettings;
  sharedContent: any;
}

export default function Index({
  preview,
  query,
  queryParams,
  selectedService,
  siteSettings,
  sharedContent,
}: Props): JSX.Element {
  const { data: previewData } = usePreviewSubscription(query, {
    params: { slug: queryParams } ?? {},
    initialData: selectedService,
    enabled: preview,
  });
  const previewService = filterDataToSingleItem(previewData, preview);

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
    <SharedContentContext value={sharedContent}>
      <ErrorTrackingBoundary>
        <ServiceDetailLayout
          siteSettings={siteSettings}
          service={previewService || selectedService}
          sharedContent={sharedContent}
        />
      </ErrorTrackingBoundary>
    </SharedContentContext>
  );
}
