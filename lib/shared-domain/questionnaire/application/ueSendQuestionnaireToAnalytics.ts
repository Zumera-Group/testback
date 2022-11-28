import { EnvironmentService } from 'environment.service';
import TagManager from 'react-gtm-module';
import { useValuationStore } from '../store';

export const useSendQuestionnaireToAnalytics = () => {
  const {
    answers,
    industryId,
    sectorId,
    uniqueId,
    sectorSheetName,
    industrySheetName,
    mainStep,
    subStep,
  } = useValuationStore();

  const sendQuestionnaireToAnalytics = (
    salesforceId: string,
    additionalProperties: Record<string, any> = {},
  ) => {
    if (process.browser && EnvironmentService.isProduction()) {
      TagManager.dataLayer({
        dataLayer: {
          event: 'questionnaire',
          data: {
            uniqueId,
            industryId,
            sectorId,
            sectorSheetName,
            industrySheetName,
            answers,
            mainStep,
            subStep,
            salesforceId,
            ...additionalProperties,
          },
        },
      });
    }
  };

  return { sendQuestionnaireToAnalytics };
};
