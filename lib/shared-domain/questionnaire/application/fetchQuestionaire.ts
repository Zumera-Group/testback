import { Locale } from 'lib/locale';
import { QuestionnaireFacade } from '../infrastructure/questionnaire.facade';

export const fetchQuestionnaire = async (
  locale: Locale,
  slug: string,
  preview?: boolean,
) => {
  const facade = new QuestionnaireFacade();

  return await facade.getQuestionnaire(locale, slug, preview);
};
