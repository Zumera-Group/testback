import { Question } from '../domain';
import { useValuationStore } from '../store';

export const useAnswers = (
  question: Question,
) => {
  const { getAnswer, setAnswer, removeAnswer, setCurrencyAnswers, currency } = useValuationStore();

  return {
    setAnswer: (value: any) => {
      if (question?.salesforceId) {
        setAnswer({ id: question.salesforceId, value });
      } else {
        setAnswer({ id: question?._id, value });
      }
    },
    setCurrencyAnswer: (value: any) => {
      if (question?.salesforceId) {
        setCurrencyAnswers({ id: question.salesforceId, value, currency });
      } else {
        setCurrencyAnswers({ id: question?._id, value, currency });
      }
    },
    getAnswer: () => {
      if (getAnswer(question?.salesforceId)) {
        return getAnswer(question?.salesforceId);
      }
      return getAnswer(question?._id);
    },
    removeAnswer: (value: any) => {
      if (question?.salesforceId) {
        removeAnswer({ id: question.salesforceId, value });
      }
    },
  };
};
