import { Questionnaire } from 'lib/shared-domain/questionnaire/domain';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { getTranslateByScope } from '../../../../translation/i18n';
import { qLogs } from '../application/log';
import { ExchangeRateService } from 'lib/shared-domain/salesforce/application/exchangeRate';
import {IApiField} from "../../../../@types/api";
import {IGetFieldsFilters} from "../../salesforce/infrastructure/types";
import {SalesforceFacade} from "../../salesforce/infrastructure/salesforce.facade";

const t = getTranslateByScope('sidebar');

export type Currencies = 'EUR' | 'CHF' | 'GBP';


interface ValuationState {
  mainStep: number;
  subStep: number;
  setStep: (mainStep: number, subStep: number) => void;
  questionnaire: Questionnaire;
  setQuestionnaire: (questionnaire: Questionnaire) => void;
  answers: Record<string, any>;
  getAnswers: () => Record<string, any>;
  setAnswer: (params: { value: any; id: string }) => void;
  removeAnswer: (params: { value: any; id: string }) => void;
  getAnswer: (id: string) => any;

  currencyAnswers: Record<string, any>;
  getCurrencyAnswers: () => Record<string, any>;
  setCurrencyAnswers: (params: { value: any; id: string, currency: Currencies }) => void;
  exchangeRates: Record<string, number>;
  setExchangeRates: () => void;
  currency: Currencies;
  setCurrency: (currency: Currencies) => void;
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
  leadSourceURL: string | null;
  setSectorId: (sectorId: string) => void;
  setIndustryId: (industryId: string) => void;
  setAssessmentPurpose: (assessmentPurpose: string) => void;
  setLeadSourceURL: (leadSourceURL: string) => void;
  sectorSheetName: string | null;
  industrySheetName: string | null;
  setSectorSheetName: (sectorSheetName: string) => void;
  setIndustrySheetName: (industrySheetName: string) => void;
  isFadingOut: boolean;
  setIsFadingOut: (arg: boolean) => void;
  salesforceFields: {[name: string]: IApiField},
  salesforceFieldsAreFetching: boolean,
  fetchSalesforceFields: (filters?: IGetFieldsFilters) => Promise<void>;
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
      exchangeRates: {},
      setExchangeRates: async () => {
        if (!Object.keys(get().exchangeRates).length) {
          const exchangeRates = await ExchangeRateService.fetchExchangeRates();
          exchangeRates && set({ exchangeRates });
        }
      },
      currencyAnswers: {},
      setCurrencyAnswers: async (params) => {
        const valueInEuros = await ExchangeRateService.convertToEuro(params.value, params.currency);
        set((state) => ({
          currencyAnswers: { ...state.currencyAnswers, [params.id]: valueInEuros },
        }));
      },
      getCurrencyAnswers: () => {
        return get().currencyAnswers;
      },
      currency: 'EUR',
      setCurrency: (currency) => {
        set({ currency });
      },
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
      leadSourceURL: null,
      setLeadSourceURL: (leadSourceURL: string) => {
        set({ leadSourceURL });
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
        const existingAnswers = get().answers;
        set((state) => ({
          ...state,
          answers: {
            ...existingAnswers,
            ...answers,
          },
        }));
      },
      getAnswers: () => {
        return get().answers;
      },
      setAnswer: (params) => {
        qLogs('setAnswer => updating to' + JSON.stringify(params));
        set((state) => ({
          answers: { ...state.answers, [params.id]: params.value },
        }));
      },
      getAnswer: (id: string) => {
        return get().answers?.[id];
      },
      removeAnswer: (params: { value: any; id: string }) => {
        qLogs('removeAnswer => ' + JSON.stringify(params));
        set((state) => {
          const updatedAnswers = { ...state.answers };
          if (updatedAnswers.hasOwnProperty(params.id)) {
            delete updatedAnswers[params.id];
            set({ answers: updatedAnswers });
          }
        });
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
      salesforceFields: {},
      salesforceFieldsAreFetching: false,
      fetchSalesforceFields: async (filters?: IGetFieldsFilters) => {
        if (get().salesforceFieldsAreFetching) {
          return;
        }

        set({salesforceFieldsAreFetching: true});
        try {
          const facade = new SalesforceFacade();
          const fields = await facade.getFields(filters);
          const fieldsToSave: {[name: string]: IApiField} = {};
          fields.forEach((field) => {
            if (field.name) {
              fieldsToSave[field.name] = field;
            }
          });

          set({salesforceFields: fieldsToSave});
        } catch (e) {
          console.error(e);
        }
        set({salesforceFieldsAreFetching: false});
      }
    }),
    {
      name: 'valuation-store',
      getStorage: () => sessionStorage,
    },
  ),
);
