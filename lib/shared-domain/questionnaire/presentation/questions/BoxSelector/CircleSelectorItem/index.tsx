import React from 'react';
import { useSelectAnswers } from '../useSelectAnswer';
import { BoxAnswer, Question } from 'lib/shared-domain/questionnaire/domain';
import { useSelectBoxSelector } from 'lib/shared-domain/questionnaire/presentation/questions/BoxSelector/useSelectBoxSelector';
import { setStylesOnClick } from '../helpers';

export const CircleSelectorItem: React.FC<{
  box: BoxAnswer;
  question: Question;
}> = ({ box, question }) => {
  const { isSelected, onSelectAnswer } = useSelectAnswers(
    question,
    box.boxContent || box.label,
  );
  const { onSelect } = useSelectBoxSelector({
    questionId: question?.questionId,
    box,
    onSelectAnswer,
  });
  const { borderCircleSelector, circleBorder, fontWeight } =
    setStylesOnClick(isSelected);

  return <div>Circle selector</div>;
};
