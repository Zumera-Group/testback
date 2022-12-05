import React from 'react';
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
import { SanityIcon } from '../../lib/shared-domain/questionnaire/domain/index';
import { SharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { SharedContentFacade } from 'lib/shared-domain/page/infrastructure/sharedContent.facade';
import { usePreviewSubscription } from '../../lib/sanity';
import { filterDataToSingleItem } from '../../lib/shared-domain/page/infrastructure/page.facade';
import LoadingIndicator from 'lib/animations/LoadingIndicator';
import { fetchSectors } from '../../lib/shared-domain/sectors/application/useGetSectors';
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
  selectedQuestionnaire: Questionnaire;
  siteSettings: SiteSettings;
  sectorSpecificQuestions: Question[];
  locale: string;
  sectors: Sector[];
  sharedContent: any;
}

export default function Index({
  preview,
  query,
  queryParams,
  selectedQuestionnaire,
  siteSettings,
  sectorSpecificQuestions,
  sectors,
  sharedContent,
  locale,
}: Props): JSX.Element {
  const { data: previewData } = usePreviewSubscription(query, {
    params: { slug: queryParams } ?? {},
    initialData: selectedQuestionnaire,
    enabled: preview,
  });

  const previewQuestionnaire = filterDataToSingleItem(previewData, preview);

  const router = useRouter();

  if (router.isFallback) {
    return <LoadingIndicator siteSettings={siteSettings} />;
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
