import { fetchPage } from 'lib/shared-domain/page/application/useGetPage';
import { Page, SiteSettings } from 'lib/shared-domain/page/domain';
import { fetchSiteSettings } from '../lib/shared-domain/page/application/useGetSiteSettings';
import PageLayout from 'lib/shared-domain/page/presentation/PageLayout';
import { fetchNewsArticles } from '../lib/shared-domain/newsArticle/application/useGetNewsArticles';
import { fetchEmployees } from '../lib/shared-domain/employees/application/useGetEmployees';
import { NewsArticle } from '../lib/shared-domain/newsArticle/domain/index';
import { Employee } from '../lib/shared-domain/employees/domain/index';
import { fetchTransactions } from 'lib/shared-domain/transactions/application/useGetTransactions';
import { Transaction } from 'lib/shared-domain/transactions/domain';
import { Service, Sector } from '../lib/shared-domain/page/domain/index';
import { fetchSectors } from 'lib/shared-domain/sectors/application/useGetSectors';
import { fetchServices } from 'lib/shared-domain/services/application/useGetServices';
import { fetchOffices } from 'lib/shared-domain/offices/application/useGetOffices';
import { Office } from 'lib/shared-domain/offices/domain/index';
import { ErrorTrackingBoundary } from 'lib/ErrorTrackingBoundary';
import { fetchJobs } from '../lib/shared-domain/jobs/application/useGetJobs';
import { Job } from 'lib/shared-domain/jobs/domain';
import { SharedContentFacade } from 'lib/shared-domain/page/infrastructure/sharedContent.facade';
import { SharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { useRouter } from 'next/router';
import { usePreviewSubscription } from '../lib/sanity';
import { filterDataToSingleItem } from '../lib/shared-domain/page/infrastructure/page.facade';
import { enPaths as en, dePaths as de } from '../lib/shared-domain/page/paths';
import { REVALIDATE_ON_SUCCESS_IN_SECONDS } from '../lib/shared-domain/page/constants';

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
  const { data: previewData } = usePreviewSubscription(query, {
    params: { slug: queryParams } ?? {},
    initialData: page,
    enabled: preview,
  });

  const previewPage = filterDataToSingleItem(previewData, preview);

  const router = useRouter();

  if (router.isFallback) {
    return null;
  }

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
