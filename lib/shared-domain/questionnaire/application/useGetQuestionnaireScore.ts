import { SalesforceFacade } from '../../salesforce/infrastructure/salesforce.facade';
import { useValuationStore } from '../store';
import { useSendQuestionnaireToAnalytics } from './ueSendQuestionnaireToAnalytics';

export const useGetSalesforceScore = () => {
  const facade = new SalesforceFacade();

  const { uniqueId } = useValuationStore();
  const { sendQuestionnaireToAnalytics } = useSendQuestionnaireToAnalytics();

  return {
    getScore: async () => {
      try {
        const data = await facade.getLeadEntryScore(uniqueId);
        sendQuestionnaireToAnalytics('score', { score: data });

        return data;
      } catch (e) {
        throw new Error('Something went wrong calculating the score');
      }
    },
  };
};
