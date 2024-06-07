'use client';

import {useEffect, useMemo, useState} from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { qLogs } from 'lib/shared-domain/questionnaire/application/log';
import {
  calculateCurrentPosition,
  calculateTotalNumberOfQuestions,
} from 'lib/shared-domain/tax-calculator/hooks/helpers';
import { useGetURL } from 'lib/hooks/useGetURL';
import { useTaxCalculatorStore } from 'lib/shared-domain/tax-calculator/store';
import { useTaxSalesforceQueries } from 'lib/shared-domain/tax-calculator/hooks/useTaxSalesforceQueries';
import {Category, Question} from '../../questionnaire/domain';
import _isNil from 'lodash/isNil';

function useProgress({ questionsByCategory, programmingCategoryIndex, programmingStepIndex }: {
  questionsByCategory: Category[],
  programmingCategoryIndex?: number,
  programmingStepIndex?: number
}) {
  const [currentPositionInTotalNumberOfQuestion, setCurrentPositionInTotalNumberOfQuestion] = useState<number>(0);

  const {totalNumberOfQuestions, progress} = useMemo(() => {
    const totalNumberOfQuestions: number = calculateTotalNumberOfQuestions(questionsByCategory);
    const progress: number = totalNumberOfQuestions > 0
      ? (currentPositionInTotalNumberOfQuestion / totalNumberOfQuestions) * 100
      : 0
    ;

    return {totalNumberOfQuestions, progress};
  }, [questionsByCategory, currentPositionInTotalNumberOfQuestion]);

  useEffect(() => {
    if (!_isNil(programmingCategoryIndex) && !_isNil(programmingStepIndex)) {
      const position = calculateCurrentPosition(questionsByCategory, programmingCategoryIndex, programmingStepIndex);
      setCurrentPositionInTotalNumberOfQuestion(position);
    }
  }, [programmingCategoryIndex, programmingStepIndex, questionsByCategory]);

  const questionsOnCurrentCategory = (!_isNil(programmingCategoryIndex) && Array.isArray(questionsByCategory[programmingCategoryIndex]?.questions))
    ? questionsByCategory[programmingCategoryIndex]?.questions
    : []
  ;
  const currentQuestion = !_isNil(programmingStepIndex) ? questionsOnCurrentCategory[programmingStepIndex] : null;

  return {
    progress,
    currentPositionInTotalNumberOfQuestion,
    totalNumberOfQuestions,
    currentQuestion,
    questionsOnCurrentCategory,
  } as {
    progress: number,
    currentPositionInTotalNumberOfQuestion: number,
    totalNumberOfQuestions: number,
    currentQuestion: Question|null,
    questionsOnCurrentCategory: Question[]
  };
}

export function useTaxQuestionnaire({ questionsByCategory }: {
  questionsByCategory: Category[],
}) {
  const fullUrl = useGetURL();
  const router = useRouter();

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const {categoryIndex, stepIndex, isOnResultsScreen, programmingCategoryIndex, programmingStepIndex} = useMemo(() => {
    let categoryIndex = 1;
    let stepIndex = 1;

    if (searchParams.has('category')) {
      const category = parseInt(searchParams.get('category'));
      if (!isNaN(category) && category > 0) {
        categoryIndex = category;
      }
    }

    if (searchParams.has('step')) {
      const step = parseInt(searchParams.get('step'));
      if (!isNaN(step) && step > 0) {
        stepIndex = step;
      }
    }

    const isOnResultsScreen = searchParams.get('isOnResultsScreen') === 'true';
    const programmingCategoryIndex = categoryIndex - 1;
    const programmingStepIndex = stepIndex - 1;

    return {categoryIndex, stepIndex, isOnResultsScreen, programmingCategoryIndex, programmingStepIndex};
  }, [searchParams]);

  const {
    progress,
    currentPositionInTotalNumberOfQuestion,
    totalNumberOfQuestions,
    currentQuestion,
    questionsOnCurrentCategory,
  } = useProgress({ questionsByCategory, programmingCategoryIndex, programmingStepIndex });

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
      //currentField is always undefined in the currentQuestion - Looks like a bug:
      // currentField: currentQuestion?.questionField || '',
      currentField: '',
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



