import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { qLogs } from 'lib/shared-domain/questionnaire/application/log';
import {
  calculateCurrentPosition,
  calculateTotalNumberOfQuestions,
} from 'lib/shared-domain/tax-calculator/hooks/helpers';
import { TaxCalculatorQuestionnaire } from 'lib/shared-domain/tax-calculator/types';
import { useGetURL } from 'lib/hooks/useGetURL';
import { useTaxCalculatorStore } from 'lib/shared-domain/tax-calculator/store';
import { useTaxSalesforceQueries } from 'lib/shared-domain/tax-calculator/hooks/useTaxSalesforceQueries';


function useProgress({ questionsByCategory }) {
  const searchParams = useSearchParams();
  const categoryIndex = Number(searchParams.get('category') ?? 0);
  const stepIndex = Number(searchParams.get('step') ?? 0);
  const programmingStepIndex = stepIndex - 1;
  const programmingCategoryIndex = categoryIndex - 1;

  const [currentPositionInTotalNumberOfQuestion, setCurrentPositionInTotalNumberOfQuestion] = useState(0);
  useEffect(() => {
    const position = calculateCurrentPosition(questionsByCategory, programmingCategoryIndex, programmingStepIndex);
    setCurrentPositionInTotalNumberOfQuestion(position);
  }, [categoryIndex, stepIndex, questionsByCategory]);

  const totalNumberOfQuestions = calculateTotalNumberOfQuestions(questionsByCategory);
  const progress = (currentPositionInTotalNumberOfQuestion / totalNumberOfQuestions) * 100;

  const questionsOnCurrentCategory = questionsByCategory[programmingCategoryIndex]?.questions ?? [];
  const currentQuestion = questionsOnCurrentCategory[programmingStepIndex];

  return {
    progress,
    currentPositionInTotalNumberOfQuestion,
    totalNumberOfQuestions,
    currentQuestion,
    questionsOnCurrentCategory,
  };
}

export function useTaxQuestionnaire({ questionsByCategory }: {
  questionsByCategory: TaxCalculatorQuestionnaire['questionsByCategory']
}) {
  const fullUrl = useGetURL();
  const router = useRouter();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const categoryIndex = Number(searchParams.get('category') ?? 1);
  const stepIndex = Number(searchParams.get('step') ?? 1);
  const isOnResultsScreen = searchParams.get('isOnResultsScreen') === 'true';
  const programmingStepIndex = stepIndex - 1;
  const programmingCategoryIndex = categoryIndex - 1;

  // set the url params on first render
  useEffect(() => {
    if (!categoryIndex || !stepIndex) {
      router.push(`${pathname}?category=1&step=1`);
    }
  }, []);

  const {
    progress,
    currentPositionInTotalNumberOfQuestion,
    totalNumberOfQuestions,
    currentQuestion,
    questionsOnCurrentCategory,
  } = useProgress({ questionsByCategory });

  const { setLeadSourceURL, uniqueId } = useTaxCalculatorStore();
  const { syncTaxCurrentAnswersToSalesforce } = useTaxSalesforceQueries();


  // *** helpers ***
  const onNextQuestion = () => {
    setLeadSourceURL(fullUrl);

    qLogs('onNextQuestion');
    qLogs('ID ' + currentQuestion?.salesforceId);

    syncTaxCurrentAnswersToSalesforce({
      uniqueId,
      currentSalesforceId: currentQuestion?.salesforceId,
      currentQuestionNumber: currentPositionInTotalNumberOfQuestion,
      currentField: currentQuestion?.questionField,
    });

    const hasNextQuestion = questionsOnCurrentCategory[programmingStepIndex + 1];
    const hasNextCategory = questionsByCategory[programmingCategoryIndex + 1];

    if (hasNextQuestion) {
      router.push(`${pathname}?category=${categoryIndex}&step=${stepIndex + 1}`);
    } else if (hasNextCategory) {
      router.push(`${pathname}?category=${categoryIndex + 1}&step=${1}`);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.set('isOnResultsScreen', 'true');
      router.push(`${pathname}?${params.toString()}`);
      qLogs('onNextQuestion: Setting the results screen to true');
    }
  };

  const onPreviousQuestion = () => {
    const hasPrevQuestion = questionsOnCurrentCategory[programmingStepIndex - 1];
    const hasPrevCategory = questionsByCategory?.[programmingCategoryIndex - 1];

    if (hasPrevQuestion) {
      router.push(`${pathname}?category=${categoryIndex}&step=${stepIndex - 1}`);
    } else if (hasPrevCategory) {
      const prevCategoryLength = hasPrevCategory?.questions?.length;
      router.push(`${pathname}?category=${categoryIndex - 1}&step=${prevCategoryLength}`);
    } else {
      router.push(`${pathname}?category=${1}&step=${1}`);
    }
  };

  return {
    categoryIndex,
    stepIndex,
    programmingCategoryIndex,
    programmingStepIndex,
    progress,
    currentPositionInTotalNumberOfQuestion,
    totalNumberOfQuestions,
    currentQuestion,
    isOnResultsScreen,
    onNextQuestion,
    onPreviousQuestion,
  };
}



