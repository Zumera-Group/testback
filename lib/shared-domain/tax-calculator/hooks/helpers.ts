import { TaxCalculatorQuestionnaire } from 'lib/shared-domain/tax-calculator/types';

export function setBrowserCookie(name, value, days) {
  if (process.browser) {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }
}

export function getBrowserCookie(name) {
  if (process.browser) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
}

export const calculateTotalNumberOfQuestions = (questionsByCategory: TaxCalculatorQuestionnaire['questionsByCategory']) => questionsByCategory?.reduce(
  (numberOfQuestions, currentCategory) => {
    return numberOfQuestions + (currentCategory.questions?.length ?? 0);
  },
  0,
);

export const calculateCurrentPosition = (questionsByCategory: TaxCalculatorQuestionnaire['questionsByCategory'], categoryIndex: number, stepIndex: number) => {
  let numberOfStepsInOtherCategories = 0;

  for (let i = 0; i < categoryIndex; i++) {
    numberOfStepsInOtherCategories = numberOfStepsInOtherCategories + questionsByCategory?.[i]?.questions?.length;
  }

  return numberOfStepsInOtherCategories + stepIndex + 1;
};

