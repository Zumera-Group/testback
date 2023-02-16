import { fetchSiteSettings } from 'lib/shared-domain/page/application/useGetSiteSettings';
import { SiteSettings } from 'lib/shared-domain/page/domain';
import { fetchEmployee } from '../../lib/shared-domain/employees/application/useGetEmployee';
import { Employee } from 'lib/shared-domain/employees/domain';
import { fetchEmployees } from 'lib/shared-domain/employees/application/useGetEmployees';
import { EmployeeDetailLayout } from '../../lib/shared-domain/employees/presentation/EmployeeDetailLayout';
import { ErrorTrackingBoundary } from 'lib/ErrorTrackingBoundary';
import { fetchEmployeeDetailContent } from '../../lib/shared-domain/employees/application/useGetEmployeeDetailContent';
import { SharedContentFacade } from 'lib/shared-domain/page/infrastructure/sharedContent.facade';
import { SharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { useRouter } from 'next/router';
import { EmployeeHero } from 'lib/shared-domain/employees/presentation/EmployeeHero';
// import { usePreviewSubscription } from '../../lib/sanity';
import { filterDataToSingleItem } from '../../lib/shared-domain/page/infrastructure/page.facade';
import {
  REVALIDATE_ON_FAILURE_TIME_IN_SECONDS,
  REVALIDATE_ON_SUCCESS_IN_SECONDS,
} from '../../lib/shared-domain/page/constants';
import { useEffect, useState } from 'react';
import { SecretKeyLockScreen } from 'components/SecretKeyLockScreen';

export async function getStaticPaths() {
  const en = await fetchEmployees('en');

  const mapSlugsEn = en
    .map((data) => data?.slug?.current)
    .filter((data) => data)
    .slice(0, 40);

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
    const sharedContent =
      await new SharedContentFacade().getSharedContentFacade(locale);
    const siteSettings = await fetchSiteSettings(locale);
    if (localeFromRoute !== locale) {
      return {
        redirect: {
          destination: `/${locale}/404`,
        },
      };
    }
    const { employee: employeeDetail, query } = await fetchEmployee(
      locale,
      params.slug,
      preview,
    );

    if (!employeeDetail) {
      return {
        redirect: {
          destination: `/${locale}/404`,
        },
      };
    }

    if (employeeDetail.hidePage) {
      return {
        redirect: {
          destination: `/${locale}/home`,
        },
      };
    }

    const employeeDetailContent = await fetchEmployeeDetailContent(locale);

    return {
      props: {
        preview,
        query,
        queryParams: params.slug,
        selectedEmployee: employeeDetail || null,
        siteSettings,
        employeeDetailContent,
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
  selectedEmployee: Employee;
  siteSettings: SiteSettings;
  employeeDetailContent: any;
  sharedContent: any;
}

export default function Index({
  preview,
  query,
  queryParams,
  selectedEmployee,
  siteSettings,
  employeeDetailContent,
  sharedContent,
}: Props): JSX.Element {
  // const { data: previewData } = usePreviewSubscription(query, {
  //   params: { slug: queryParams } ?? {},
  //   initialData: selectedEmployee,
  //   enabled: preview,
  // });
  const previewEmployee = filterDataToSingleItem(selectedEmployee, preview);
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
    return (
      <>
        <EmployeeHero employee={{} as any} content={{}} />
        <div
          style={{ display: 'flex', justifyContent: 'center', paddingTop: 32 }}
        >
          <p>Loading</p>
        </div>
      </>
    );
  }

  if (router.isFallback) {
    return null;
  }

  if (siteSettings && siteSettings?.isUnderSecretKey && !isSecretOpen) {
    return <SecretKeyLockScreen siteSettings={siteSettings} />;
  }

  return (
    <SharedContentContext value={sharedContent}>
      <ErrorTrackingBoundary>
        <EmployeeDetailLayout
          siteSettings={siteSettings}
          employee={previewEmployee || selectedEmployee}
          employeeDetailContent={employeeDetailContent}
        />
      </ErrorTrackingBoundary>
    </SharedContentContext>
  );
}
