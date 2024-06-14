import React from 'react';
import { useRouter } from 'next/router';
import { ErrorTrackingBoundary } from 'lib/ErrorTrackingBoundary';
import { fetchPreQuestionnaire } from 'lib/shared-domain/pre-questionnaire/service';
import { fetchSiteSettings } from 'lib/shared-domain/page/application/useGetSiteSettings';
import PreQuestionnaireLayout from 'lib/shared-domain/pre-questionnaire/presentation/PreQuestionnaireLayout';
import { SiteSettings } from 'lib/shared-domain/page/domain';


export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({
  locale,
  params,
  preview = false,
}) {
  try {
    const siteSettings = await fetchSiteSettings(locale);

    const { data } = await fetchPreQuestionnaire(locale, params.slug, preview);

    return {
      props: {
        data,
        siteSettings,
        locale,
      },
    };
  } catch (e) {
    console.error(e);
    return { notFound: true, revalidate: 10 };
  }
}

interface Props {
  data: PreQuestionnaireData;
  siteSettings: SiteSettings;
  locale: string;
}

export default function Index({
  data,
  siteSettings,
  locale,
}: Props): JSX.Element {
  const router = useRouter();

  if (router.isFallback) {
    return null;
  }

  return (
    <ErrorTrackingBoundary>
      <PreQuestionnaireLayout locale={locale} siteSettings={siteSettings} data={data[0]} />
    </ErrorTrackingBoundary>
  );
}
