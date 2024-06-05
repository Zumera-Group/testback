import { AxiosService } from 'lib/services/axios.service';
import { useTaxCalculatorStore } from 'lib/shared-domain/tax-calculator/store';
import {
  useSendQuestionnaireToAnalytics,
} from 'lib/shared-domain/questionnaire/application/ueSendQuestionnaireToAnalytics';
import { MarketingParamsService } from 'lib/shared-domain/salesforce/application/marketingParamsService';
import { logError } from 'lib/logError';


const endpoints = {
  createOrUpdateLeadEntry: 'lead_entries',
};

const requestsConfig = {
  baseURL: process.env.NEXT_PUBLIC_SALESFORCE_API_BASE_URL,
};


export const useTaxSalesforceQueries = () => {
  const httpService = new AxiosService();

  const { getTaxAnswers, leadSourceURL } = useTaxCalculatorStore();
  const { sendQuestionnaireToAnalytics } = useSendQuestionnaireToAnalytics();


  return {
    syncTaxCurrentAnswersToSalesforce: async ({
      uniqueId,
      currentSalesforceId,
      currentQuestionNumber,
      currentField,
    }) => {
      sendQuestionnaireToAnalytics(currentSalesforceId);
      const answers = getTaxAnswers();
      const cookies = MarketingParamsService.getCookies();
      const deviceInfo = MarketingParamsService.collectDeviceInfo();
      const formattedMarketingParams = MarketingParamsService.formatMarketingParams();
      try {
        const params = {
          lead_entry: {
            unique_id: uniqueId,
            data: {
              Calculator_Type__c: 'tax-calculator',
              Lead_Source_URL__c: leadSourceURL,
              ...answers,
              ...formattedMarketingParams,
              ...cookies,
              ...deviceInfo,
            },
            dropped_at: {
              field: currentField,
              progress: currentQuestionNumber,
            },
          },
        };

        await httpService.post(
          endpoints.createOrUpdateLeadEntry,
          params,
          requestsConfig,
        );
      } catch (e) {
        logError(e, { where: 'syncTaxCurrentAnswersToSalesforce' });

        //do we really need to throw error to user???
        // throw new Error(e);
      }
    },
    leadDetailsSubmission: async (
      uniqueId: string,
    ): Promise<void> => {
      const answers = getTaxAnswers();
      try {
        const leadParams = {
          lead_entry: {
            email: answers.email,
            last_name: answers.LastName,
            phone: answers.phone,
          },
        };

        await httpService.put(
          `lead_entries/${uniqueId}/salesforce`,
          leadParams,
          requestsConfig,
        );
      } catch (e) {
        logError(e, { where: 'leadDetailsSubmission' });
        return e;
      }
    },
  };
};
