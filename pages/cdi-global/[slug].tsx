import { fetchSiteSettings } from 'lib/shared-domain/page/application/useGetSiteSettings';
import { SiteSettings } from 'lib/shared-domain/page/domain';
import { ErrorTrackingBoundary } from 'lib/ErrorTrackingBoundary';
import { Office } from '../../lib/shared-domain/offices/domain/index';
import {
  fetchOffice,
  fetchOffices,
} from '../../lib/shared-domain/offices/application/useGetOffices';
import { OfficeCDIDetailLayout } from 'lib/shared-domain/offices/presentation/OfficeCDIDetailLayout';
import { fetchCDIOfficeDetailContent } from '../../lib/shared-domain/offices/application/useGetCDIOfficeDetailContent';
import { SharedContentFacade } from 'lib/shared-domain/page/infrastructure/sharedContent.facade';
import { SharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { useRouter } from 'next/router';
// import { usePreviewSubscription } from '../../lib/sanity';
import { filterDataToSingleItem } from '../../lib/shared-domain/page/infrastructure/page.facade';

import { slugifyOffice } from 'lib/shared-domain/offices/application/slugifyOffice';
import { useEffect, useState } from 'react';
import { SecretKeyLockScreen } from 'components/SecretKeyLockScreen';
import { REVALIDATE_ON_SUCCESS_IN_SECONDS } from 'lib/shared-domain/page/constants';

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ locale, params, preview = false }) {
  try {
    const siteSettings = await fetchSiteSettings(locale);
    const sharedContent =
      await new SharedContentFacade().getSharedContentFacade(locale);
    const offices = await fetchOffices(locale);

    const city = params.slug;
    const office = offices?.find((o) => {
      return slugifyOffice(city) === slugifyOffice(o.city) && o.isCDINetwork;
    });
    if (!office) {
      return {
        redirect: {
          destination: `/${locale}/404`,
        },
      };
    }
    const id = office._id;
    const { office: previewOffice, query } = await fetchOffice(
      locale,
      id,
      preview,
    );

    if (previewOffice && previewOffice.hidePage) {
      return {
        redirect: {
          destination: `/${locale}/home`,
        },
      };
    }

    const content = await fetchCDIOfficeDetailContent(locale);
    return {
      props: {
        previewOffice,
        preview,
        query,
        queryParams: params.slug,
        siteSettings,
        office: office || null,
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
  previewOffice: Office;
  preview: boolean;
  query: string;
  queryParams: string;
  siteSettings: SiteSettings;
  office: Office;
  content: any;
  sharedContent: any;
}

export default function Index({
  previewOffice,
  preview,
  query,
  queryParams,
  siteSettings,
  content,
  office,
  sharedContent,
}: Props): JSX.Element {
  // const { data: previewData } = usePreviewSubscription(query, {
  //   params: { slug: queryParams } ?? {},
  //   initialData: office,
  //   enabled: preview,
  // });

  const previewSelectedOffice = filterDataToSingleItem(office, preview);

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

  if (
    siteSettings &&
    siteSettings &&
    siteSettings?.isUnderSecretKey &&
    !isSecretOpen
  ) {
    return <SecretKeyLockScreen siteSettings={siteSettings} />;
  }

  return (
    <SharedContentContext value={sharedContent}>
      <ErrorTrackingBoundary>
        <OfficeCDIDetailLayout
          siteSettings={siteSettings}
          office={previewSelectedOffice || office}
          content={content}
        />
      </ErrorTrackingBoundary>
    </SharedContentContext>
  );
}
