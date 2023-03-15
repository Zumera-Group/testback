import { Questionnaire } from 'lib/shared-domain/questionnaire/domain';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { getTranslateByScope } from '../../../../translation/i18n';
import { qLogs } from '../application/log';

const t = getTranslateByScope('sidebar');

interface ValuationState {
  mainStep: number;
  subStep: number;
  setStep: (mainStep: number, subStep: number) => void;
  questionnaire: Questionnaire;
  setQuestionnaire: (questionnare: Questionnaire) => void;
  answers: Record<string, any>;
  getAnswers: () => Record<string, any>;
  setAnswer: (params: { value: any; id: string }) => void;
  getAnswer: (id: string) => any;
  uniqueId: string | null;
  setUniqueId: (id: string) => void;
  setAnswers: (answers: Record<string, any>) => void;
  isFirstQuestion: () => boolean;
  isLastQuestion: () => boolean;
  isOnResultScreen: boolean;
  setIsOnResultScreen: (arg: boolean) => void;
  sectorId: string | null;
  industryId: string | null;
  assessmentPurpose: string | null;
  setSectorId: (sectorId: string) => void;
  setIndustryId: (industryId: string) => void;
  setAssessmentPurpose: (assessmentPurpose: string) => void;
  sectorSheetName: string | null;
  industrySheetName: string | null;
  setSectorSheetName: (sectorSheetName: string) => void;
  setIndustrySheetName: (industrySheetName: string) => void;
  isFadingOut: boolean;
  setIsFadingOut: (arg: boolean) => void;
}

/*
Hook for valuation tool
useValuationStore

IndustryId
SectorID
isOnResultScreen
isFirstQuestion
isLastQuestion
uniqueId
answers

*/
export const useValuationStore = create<ValuationState>(
  persist(
    (set, get) => ({
      isFadingOut: false,
      setIsFadingOut: (isFadingOut: boolean) => {
        set({ isFadingOut });
      },
      sectorId: null,
      setSectorId: (sectorId: string) => {
        set({ sectorId });
      },
      industryId: null,
      setIndustryId: (industryId: string) => {
        set({ industryId });
      },
      sectorSheetName: null,
      setSectorSheetName: (sectorSheetName: string) => {
        set({ sectorSheetName });
      },
      assessmentPurpose: null,
      setAssessmentPurpose: (assessmentPurpose: string) => {
        set({ assessmentPurpose });
      },
      industrySheetName: null,
      setIndustrySheetName: (industrySheetName: string) => {
        set({ industrySheetName });
      },
      isOnResultScreen: false,
      setIsOnResultScreen: (isOnResultScreen: boolean) => {
        set({ isOnResultScreen });
      },
      isFirstQuestion: () => {
        return get().mainStep === 0 && get().subStep === 0;
      },
      isLastQuestion: () => {
        const questionnaire = get().questionnaire;
        if (!questionnaire) return false;
        const mainStep = get().mainStep;

        return (
          mainStep === questionnaire.questionsByCategory.length - 1 &&
          questionnaire.questionsByCategory[mainStep].categoryName ===
            t('results')
        );
      },
      uniqueId: null,
      setUniqueId: (uniqueId: string) => {
        set({ uniqueId });
      },
      setAnswers: (answers) => {
        set({ answers });
      },
      getAnswers: () => {
        return get().answers;
      },
      setAnswer: (params: { value: any; id: string }) => {
        qLogs('setAnswer => updating to' + JSON.stringify(params));
        set((state) => ({
          answers: { ...state.answers, [params.id]: params.value },
        }));
      },
      getAnswer: (id: string) => {
        return get().answers?.[id];
      },
      answers: {},
      questionnaire: null,
      setQuestionnaire: (questionnaire) => {
        set({ questionnaire });
      },
      mainStep: 0,
      subStep: 0,
      setStep: (mainStep, subStep) => {
        set({ mainStep, subStep });
      },
    }),
    {
      name: 'valuation-store',
      getStorage: () => sessionStorage,
    },
  ),
);
