import create from 'zustand';
import { persist } from 'zustand/middleware';
import { qLogs } from 'lib/shared-domain/questionnaire/application/log';


interface TaxCalculatorState {
  taxAnswers: Record<string, any>;
  getTaxAnswers: () => Record<string, any>;
  setTaxAnswers: (answers: Record<string, any>) => void;
  setTaxAnswer: (params: { value: any; id: string }) => void;
  removeTaxAnswer: (params: { value: any; id: string }) => void;
  getTaxAnswer: (id: string) => any;
  uniqueId: string;
  setUniqueId: (id: string) => void;
  leadSourceURL: string | null;
  setLeadSourceURL: (v: string) => void;
}

export const useTaxCalculatorStore = create<TaxCalculatorState>(
  persist(
    (set, get) => ({
      leadSourceURL: null,
      setLeadSourceURL: (leadSourceURL: string) => {
        set({ leadSourceURL });
      },
      uniqueId: null,
      setUniqueId: (uniqueId: string) => {
        set({ uniqueId });
      },
      setAnswers: (answers) => {
        const existingAnswers = get().taxAnswers;
        set((state) => ({
          ...state,
          taxAnswers: {
            ...existingAnswers,
            ...answers,
          },
        }));
      },
      getTaxAnswers: () => {
        return get().taxAnswers;
      },
      setTaxAnswers: (answers) => {
        const existingAnswers = get().taxAnswers;
        set((state) => ({
          ...state,
          answers: {
            ...existingAnswers,
            ...answers,
          },
        }));
      },
      setTaxAnswer: (params) => {
        qLogs('setTaxAnswer => updating to' + JSON.stringify(params));
        set((state) => ({
          taxAnswers: { ...state.taxAnswers, [params.id]: params.value },
        }));
      },
      getTaxAnswer: (id: string) => {
        return get().taxAnswers?.[id];
      },
      removeTaxAnswer: (params: { value: any; id: string }) => {
        qLogs('removeTaxAnswer => ' + JSON.stringify(params));
        set((state) => {
          const updatedAnswers = { ...state.taxAnswers };
          if (updatedAnswers.hasOwnProperty(params.id)) {
            delete updatedAnswers[params.id];
            set({ taxAnswers: updatedAnswers });
          }
        });
      },
      taxAnswers: {},
    }),
    {
      name: 'tax-calculator-store',
      getStorage: () => sessionStorage,
    },
  ),
);
