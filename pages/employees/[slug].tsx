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
import { usePreviewSubscription } from '../../lib/sanity';
import { filterDataToSingleItem } from '../../lib/shared-domain/page/infrastructure/page.facade';
import { REVALIDATE_ON_FAILURE_TIME_IN_SECONDS } from '../../lib/shared-domain/page/constants';

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
      revalidate: 600,
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
  const { data: previewData } = usePreviewSubscription(query, {
    params: { slug: queryParams } ?? {},
    initialData: selectedEmployee,
    enabled: preview,
  });
  const previewEmployee = filterDataToSingleItem(previewData, preview);
  const router = useRouter();

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
