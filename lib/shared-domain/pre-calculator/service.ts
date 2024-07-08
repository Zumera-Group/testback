import { Locale } from 'lib/locale';
import { SanityService } from 'lib/services/sanity.service';
import { logError } from 'lib/logError';
import { SERVER_FETCHING_ERROR } from 'lib/shared-domain/page/constants';
import { queryPreCalculator } from 'lib/shared-domain/pre-calculator/sanityQueries';


export const fetchPreCalculator = async (
  lang: Locale,
  slug: string,
  preview?: boolean,
) => {
  const sanityService = new SanityService();
  const localizedQuery = queryPreCalculator(sanityService.getSanityLocale(lang), slug);
  const data: PreQuestionnaireData = await sanityService.fetch(localizedQuery, preview);
  if (!data) {
    logError(`${SERVER_FETCHING_ERROR} at fetchPreQuestionnaire`);
    throw new Error(SERVER_FETCHING_ERROR);
  }

  return { data };
};
