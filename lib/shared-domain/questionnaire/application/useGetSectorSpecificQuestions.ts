import { Locale } from 'lib/locale';
import { QuestionnaireFacade } from '../infrastructure/questionnaire.facade';

export const fetchSectorSpecificQuestions = async (locale: Locale) => {
  const facade = new QuestionnaireFacade();

  return await facade.getSectorSpecificQuestions(locale);
};
