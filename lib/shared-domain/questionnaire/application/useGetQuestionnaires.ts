import { Locale } from 'lib/locale';
import { QuestionnaireFacade } from '../infrastructure/questionnaire.facade';

export const fetchQuestionnaires = async () => {
  const facade = new QuestionnaireFacade();

  return await facade.getQuestionnaires();
};
