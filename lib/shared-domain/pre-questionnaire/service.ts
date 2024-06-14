import { Locale } from 'lib/locale';
import { SanityService } from 'lib/services/sanity.service';
import { queryPreQuestionnaire } from 'lib/shared-domain/tax-calculator/sanityQueries';
import { logError } from 'lib/logError';
import { SERVER_FETCHING_ERROR } from 'lib/shared-domain/page/constants';


export const fetchPreQuestionnaire = async (
  lang: Locale,
  slug: string,
  preview?: boolean,
) => {
  const sanityService = new SanityService();
  const localizedQuery = queryPreQuestionnaire(sanityService.getSanityLocale(lang), slug);
  const data: PreQuestionnaireData = await sanityService.fetch(localizedQuery, preview);
  if (!data) {
    logError(`${SERVER_FETCHING_ERROR} at fetchPreQuestionnaire`);
    throw new Error(SERVER_FETCHING_ERROR);
  }

  return { data };
};
