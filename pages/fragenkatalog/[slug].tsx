import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchQuestionnaire } from 'lib/shared-domain/questionnaire/application/useGetQuestionnaire';
import {
  Question,
  Questionnaire,
} from 'lib/shared-domain/questionnaire/domain';

import QuestionnaireLayout from 'lib/shared-domain/questionnaire/presentation/QuestionnaireLayout';
import { fetchSiteSettings } from '../../lib/shared-domain/page/application/useGetSiteSettings';
import {
  Sector,
  SiteSettings,
} from '../../lib/shared-domain/page/domain/index';
import { ErrorTrackingBoundary } from 'lib/ErrorTrackingBoundary';
import { fetchSectorSpecificQuestions } from 'lib/shared-domain/questionnaire/application/useGetSectorSpecificQuestions';
import { SharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { SharedContentFacade } from 'lib/shared-domain/page/infrastructure/sharedContent.facade';

import { fetchSectors } from '../../lib/shared-domain/sectors/application/useGetSectors';
import { REVALIDATE_ON_SUCCESS_IN_SECONDS } from '../../lib/shared-domain/page/constants';
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
    const { questionnaireWithCategories: questionnaire, query } =
      await fetchQuestionnaire(locale, params.slug, preview);

    const sectorSpecificQuestions = await fetchSectorSpecificQuestions(locale);
    const sectors = await fetchSectors(locale);

    if (
      !questionnaire ||
      !questionnaire.questionsByCategory ||
      questionnaire.questionsByCategory.length === 0
    ) {
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
        selectedQuestionnaire: questionnaire || null,
        siteSettings,
        sectorSpecificQuestions,
        sectors,
        locale,
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
  selectedQuestionnaire: Questionnaire;
  siteSettings: SiteSettings;
  sectorSpecificQuestions: Question[];
  locale: string;
  sectors: Sector[];
  sharedContent: any;
}

export default function Index({
  selectedQuestionnaire,
  siteSettings,
  sectorSpecificQuestions,
  sectors,
  sharedContent,
  locale,
}: Props): JSX.Element {
  const previewQuestionnaire = selectedQuestionnaire;

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
        <QuestionnaireLayout
          selectedQuestionnaire={previewQuestionnaire || selectedQuestionnaire}
          siteSettings={siteSettings}
          locale={locale}
          sectorSpecificQuestions={sectorSpecificQuestions}
          sectors={sectors}
        />
      </ErrorTrackingBoundary>
    </SharedContentContext>
  );
}
