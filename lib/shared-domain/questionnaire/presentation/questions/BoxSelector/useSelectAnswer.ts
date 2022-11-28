import { Question } from '../../../domain/index';
import { useAnswers } from '../../../application/useAnswers';

export const useSelectAnswers = (
  question: Question,
  value: string,
): { isSelected: boolean; onSelectAnswer(): void } => {
  const { getAnswer, setAnswer } = useAnswers(question);

  const answer: string = getAnswer();

  const isSelected = answer?.split(';').includes(value);

  const setMultipleAnswer = () => {
    if (!answer) {
      return setAnswer(value);
    }
    if (isSelected) {
      const unselectAnswer = answer
        .split(';')
        .filter((a) => a !== value)
        .join(';');

      return setAnswer(unselectAnswer);
    } else {
      return setAnswer(`${answer};${value}`);
    }
  };

  const onSelectAnswer = (): void => {
    question.hasMultipleAnswers ? setMultipleAnswer() : setAnswer(value);
  };

  return {
    isSelected,
    onSelectAnswer,
  };
};
