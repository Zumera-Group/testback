import { Category, Question } from 'lib/shared-domain/questionnaire/domain';
import { useValuationStore } from 'lib/shared-domain/questionnaire/store';
import React, { useEffect } from 'react';
import { useAnswers } from '../../../application/useAnswers';
import { useQuestionnaireRouter } from '../../Question';

interface Props {
  categoryIndex: number;
  question: Question;
  index: number;
  category: Category;
  currentQuestion: Question;
}

function useAutoScrollWhenActive(isActive: boolean, idForScrolling: string) {
  useEffect(() => {
    if (isActive) {
      const JustWaitABitToEnsureNotTooMuchThingsMovingTimer = 400;
      setTimeout(() => {
        const element = document.getElementById(idForScrolling) as any;
        element?.scrollIntoViewIfNeeded?.(true);
      }, JustWaitABitToEnsureNotTooMuchThingsMovingTimer);
    }
  }, [isActive, idForScrolling]);
}

export const SidebarChildStep = ({
  categoryIndex,
  question,
  index,
  category,
  currentQuestion,
}: Props): JSX.Element => {
  const { mainStep, subStep } = useValuationStore();
  const { getAnswer } = useAnswers(question);
  const { getAnswer: getCurrentAnswer } = useAnswers(currentQuestion);
  const { pushQuestion } = useQuestionnaireRouter();

  const currentActiveQuestion = category.questions[subStep];

  const isActive =
    categoryIndex === mainStep &&
    currentActiveQuestion?.navigationTitle === question?.navigationTitle;

  const isClickable = () => {
    if (isActive) return false;
    if (index < subStep) return true;
    if (getAnswer()) return true;

    const isNextQuestion = index === subStep + 1;
    const isNotRequired = !currentQuestion?.isRequired;
    const isRequiredButAnswered =
      currentQuestion?.isRequired && getCurrentAnswer();

    if (isNextQuestion && (isNotRequired || isRequiredButAnswered)) {
      return true;
    }

    return false;
  };

  const idForScrolling = question.navigationTitle + 'SidebarChildStep';
  useAutoScrollWhenActive(isActive, idForScrolling);

  return (
    <div>
      <p>{question.navigationTitle}</p>
    </div>
  );
};
