import { fetchTransactionDetail } from 'lib/shared-domain/transactions/application/useGetTransactionDetail';
import { fetchTransactionDetailContent } from 'lib/shared-domain/transactions/application/useGetTransactionDetailContent';
import { Transaction } from 'lib/shared-domain/transactions/domain';
import { TransactionDetailLayout } from 'lib/shared-domain/transactions/presentation/TransactionDetailLayout';
import { fetchSiteSettings } from 'lib/shared-domain/page/application/useGetSiteSettings';
import { SiteSettings } from 'lib/shared-domain/page/domain';
import { ErrorTrackingBoundary } from '../../lib/ErrorTrackingBoundary';
import { SharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { SharedContentFacade } from 'lib/shared-domain/page/infrastructure/sharedContent.facade';
import { useRouter } from 'next/router';
import { usePreviewSubscription } from '../../lib/sanity';
import { filterDataToSingleItem } from '../../lib/shared-domain/page/infrastructure/page.facade';

import {
  REVALIDATE_ON_FAILURE_TIME_IN_SECONDS,
  REVALIDATE_ON_SUCCESS_IN_SECONDS,
} from '../../lib/shared-domain/page/constants';
import { useEffect, useState } from 'react';
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
      revalidate: REVALIDATE_ON_SUCCESS_IN_SECONDS,
    };
  } catch (e) {
    console.error(e);
    return { notFound: true, revalidate: REVALIDATE_ON_FAILURE_TIME_IN_SECONDS };
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

  const [isSecretOpen, setIsSecretOpen] = useState(
    !siteSettings?.isUnderSecretKey,
  );
  useEffect(() => {
    if (localStorage.getItem('secretKeyOpen')) {
      setIsSecretOpen(true);
    }
  }, []);

  useEffect(() => {
    if (selectedTransaction?.hidePage) {
      router.push(`/${router.locale}/home`);
    }
  }, [selectedTransaction?.hidePage, router]);

  if (router.isFallback) {
    return null;
  }

  if (siteSettings && siteSettings?.isUnderSecretKey && !isSecretOpen) {
    return <SecretKeyLockScreen siteSettings={siteSettings} />;
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
