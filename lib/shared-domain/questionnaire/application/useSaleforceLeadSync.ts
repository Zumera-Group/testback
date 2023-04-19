import { SalesforceFacade } from '../../salesforce/infrastructure/salesforce.facade';
import { useValuationStore } from '../store';

export const useSalesforceLeadSync = () => {
  const facade = new SalesforceFacade();
  const { answers } = useValuationStore();

  return {
    syncLeadToSalesforce: async (uniqueId: string) => {
      await facade.leadDetailsSubmission(uniqueId, answers);
    },
  };
};
