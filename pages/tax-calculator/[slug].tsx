import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchSiteSettings } from 'lib/shared-domain/page/application/useGetSiteSettings';
import { SiteSettings } from 'lib/shared-domain/page/domain';
import { ErrorTrackingBoundary } from 'lib/ErrorTrackingBoundary';
import { SharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { SharedContentFacade } from 'lib/shared-domain/page/infrastructure/sharedContent.facade';
import { REVALIDATE_ON_FAILURE_TIME_IN_SECONDS } from 'lib/shared-domain/page/constants';
import { SecretKeyLockScreen } from 'components/SecretKeyLockScreen';
import { fetchTaxCalculator } from 'lib/shared-domain/tax-calculator/service';
import TaxCalculatorQuestionnaireLayout
  from 'lib/shared-domain/tax-calculator/components/TaxCalculatorLayout/TaxCalculatorQuestionnaireLayout';
import { TaxCalculatorQuestionnaire } from 'lib/shared-domain/tax-calculator/types';

interface Props {
  taxQuestionnaire: TaxCalculatorQuestionnaire;
  siteSettings: SiteSettings;
  locale: string;
  sharedContent: any;
}


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
    const sharedContent = await new SharedContentFacade().getSharedContentFacade(locale);
    const siteSettings = await fetchSiteSettings(locale);
    if (localeFromRoute !== locale) {
      return {
        redirect: {
          destination: `/${locale}/404`,
        },
      };
    }
    const { questionnaireWithCategories } = await fetchTaxCalculator(locale, params.slug, preview);

    if (!questionnaireWithCategories?.questionsByCategory?.length) {
      return {
        redirect: {
          destination: `/${locale}/404`,
        },
      };
    }

    const props: Props = {
      taxQuestionnaire: questionnaireWithCategories,
      siteSettings,
      locale,
      sharedContent,
    };
    return {
      props,
      revalidate: REVALIDATE_ON_FAILURE_TIME_IN_SECONDS,
    };
  } catch (e) {
    console.error(e);
    return { notFound: true, revalidate: 10 };
  }
}


export default function Index({
  taxQuestionnaire,
  siteSettings,
  sharedContent,
  locale,
}: Props): JSX.Element {
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
        <TaxCalculatorQuestionnaireLayout
          taxQuestionnaire={taxQuestionnaire}
          siteSettings={siteSettings}
          locale={locale}
        />
      </ErrorTrackingBoundary>
    </SharedContentContext>
  );
}
