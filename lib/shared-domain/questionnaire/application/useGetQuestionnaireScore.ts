import { SalesforceFacade } from '../../salesforce/infrastructure/salesforce.facade';
// import { useToast } from '@chakra-ui/react';
import { useValuationStore } from '../store';
import { useSendQuestionnaireToAnalytics } from './ueSendQuestionnaireToAnalytics';

export const useGetSalesforceScore = () => {
  const facade = new SalesforceFacade();
  // const toast = useToast();

  const { uniqueId } = useValuationStore();
  const { sendQuestionnaireToAnalytics } = useSendQuestionnaireToAnalytics();

  return {
    getScore: async () => {
      try {
        const data = await facade.getLeadEntryScore(uniqueId);
        sendQuestionnaireToAnalytics('score', { score: data });

        return data;
      } catch (e) {
        // toast({
        //   title: 'Something went wrong calculating the score',
        //   status: 'error',
        //   isClosable: true,
        // });

        throw new Error('Something went wrong calculating the score');
      }
    },
  };
};
