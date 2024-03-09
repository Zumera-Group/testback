import { SalesforceFacade } from '../../salesforce/infrastructure/salesforce.facade';
import { useValuationStore } from '../store';
import { useSendQuestionnaireToAnalytics } from './ueSendQuestionnaireToAnalytics';

export const useSalesforceAnswerSync = () => {
  const facade = new SalesforceFacade();
  const {
    getAnswers,
    setAnswers,
    industryId,
    sectorId,
    setIndustryId,
    setSectorId,
    sectorSheetName,
    industrySheetName,
    setIndustrySheetName,
    setSectorSheetName,
    assessmentPurpose,
    leadSourceURL,
    getCurrencyAnswers
  } = useValuationStore();
  const { sendQuestionnaireToAnalytics } = useSendQuestionnaireToAnalytics();


  return {
    syncCurrentAnswersToSalesforce: async (
      uniqueId: string,
      currentSalesforceId: string,
      currentProgress: number,
      currentQuestionNumber: string,
      currentField: string,
      mql: boolean = false,
    ) => {
      sendQuestionnaireToAnalytics(currentSalesforceId, { mql });
      const answers = getAnswers();
      await facade.createOrUpdateLeadEntry(
        uniqueId,
        currentProgress,
        answers,
        industryId,
        sectorId,
        industrySheetName,
        sectorSheetName,
        assessmentPurpose,
        leadSourceURL,
        currentQuestionNumber,
        currentField,
        getCurrencyAnswers()
      );


    },
    syncCurrentAnswersFromSalesforce: async (uniqueId: string) => {
      const answers = await facade.getLeadEntry(uniqueId);
      setAnswers(answers);
      setIndustryId(answers?.industry_id);
      setSectorId(answers?.sector_id);
      setSectorSheetName(answers?.sector_sheet_name);
      setIndustrySheetName(answers?.industry_sheet_name);
    },
  };
};
export const useLeadHistory = () => {
  const facade = new SalesforceFacade();
  return {
    syncHistory: async (
        uniqueId: string,

    ) => {
      await facade.createLeadHistory(
          uniqueId
      );
    }
  }
}
