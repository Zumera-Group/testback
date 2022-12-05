import { fetchTransactionDetail } from 'lib/shared-domain/transactions/application/useGetTransactionDetail';
import { fetchTransactionDetailContent } from 'lib/shared-domain/transactions/application/useGetTransactionDetailContent';
import { Transaction } from 'lib/shared-domain/transactions/domain';
import { TransactionDetailLayout } from 'lib/shared-domain/transactions/presentation/TransactionDetailLayout';
import { fetchSiteSettings } from 'lib/shared-domain/page/application/useGetSiteSettings';
import { SiteSettings } from 'lib/shared-domain/page/domain';
import { ErrorTrackingBoundary } from '../../lib/ErrorTrackingBoundary';
import { Custom404 } from 'pages/404';
import { SharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { SharedContentFacade } from 'lib/shared-domain/page/infrastructure/sharedContent.facade';
import { useRouter } from 'next/router';
import { EmployeeHero } from 'lib/shared-domain/employees/presentation/EmployeeHero';
import { usePreviewSubscription } from '../../lib/sanity';
import { filterDataToSingleItem } from '../../lib/shared-domain/page/infrastructure/page.facade';
import LoadingIndicator from 'lib/animations/LoadingIndicator';
import { REVALIDATE_ON_FAILURE_TIME_IN_SECONDS } from '../../lib/shared-domain/page/constants';

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
    const { transactionDetail, query } = await fetchTransactionDetail(
      locale,
      params.slug,
      preview,
    );

    if (!transactionDetail) {
      return {
        redirect: {
          destination: `/${locale}/404`,
        },
      };
    }

    const transactionDetailContent = await fetchTransactionDetailContent(
      locale,
    );

    return {
      props: {
        preview,
        query,
        queryParams: params.slug,
        selectedTransaction: transactionDetail || null,
        siteSettings,
        transactionDetailContent,
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
  selectedTransaction: Transaction;
  siteSettings: SiteSettings;
  sharedContent: any;
  transactionDetailContent: any;
}

export default function Index({
  preview,
  query,
  queryParams,
  selectedTransaction,
  siteSettings,
  transactionDetailContent,
  sharedContent,
}: Props): JSX.Element {
  const { data: previewData } = usePreviewSubscription(query, {
    params: { slug: queryParams } ?? {},
    initialData: selectedTransaction,
    enabled: preview,
  });

  const previewTransaction = filterDataToSingleItem(previewData, preview);
  const router = useRouter();

  if (router.isFallback) {
    return <LoadingIndicator siteSettings={siteSettings} />;
  }

  return (
    <SharedContentContext value={sharedContent}>
      <ErrorTrackingBoundary>
        <TransactionDetailLayout
          siteSettings={siteSettings}
          transaction={previewTransaction || selectedTransaction}
          transactionDetailContent={transactionDetailContent}
        />
      </ErrorTrackingBoundary>
    </SharedContentContext>
  );
}
