import { SalesforceFacade } from '../../salesforce/infrastructure/salesforce.facade';
import { useValuationStore } from '../store';
import { qLogs } from 'lib/shared-domain/questionnaire/application/log';

export const useSalesforceLeadSync = () => {
  const facade = new SalesforceFacade();
  const { getAnswers } = useValuationStore();


  return {
    syncLeadToSalesforce: async (uniqueId: string) => {
      await facade.leadDetailsSubmission(uniqueId, getAnswers());
    },
  };
};
