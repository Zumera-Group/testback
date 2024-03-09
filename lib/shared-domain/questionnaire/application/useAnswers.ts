import { Question } from '../domain';
import { useValuationStore } from '../store';
import { usePathname } from 'next/navigation';
import { useTaxCalculatorStore } from 'lib/shared-domain/tax-calculator/store';

export const useAnswers = (
  question: Question,
) => {
  const pathName = usePathname();
  const { getAnswer, setAnswer, removeAnswer, setCurrencyAnswers, currency } = useValuationStore();
  const { setTaxAnswer, getTaxAnswer, removeTaxAnswer } = useTaxCalculatorStore();
  const isOnTaxCalculator = pathName.includes('tax-calculator');
  const id = question?.salesforceId ?? question?._id;

  return {
    setAnswer: (value: any) => {
      if (isOnTaxCalculator) {
        setTaxAnswer({ id, value });
        return;
      }
      setAnswer({ id, value });
    },
    getAnswer: () => {
      if (isOnTaxCalculator) {
        return getTaxAnswer(id);
      }
      if (getAnswer(question?.salesforceId)) {
        return getAnswer(question?.salesforceId);
      }
      return getAnswer(question?._id);
    },
    removeAnswer: (value: any) => {
      if (isOnTaxCalculator) {
        removeTaxAnswer({ id, value });
        return;
      }

      if (question?.salesforceId) {
        removeAnswer({ id: question.salesforceId, value });
      }
    },
    setCurrencyAnswer: (value: any) => {
      setCurrencyAnswers({ id, value, currency });
    },
  };
};
