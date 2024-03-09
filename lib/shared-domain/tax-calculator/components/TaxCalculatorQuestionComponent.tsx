import React from 'react';
import { AnimateSharedLayout } from 'framer-motion';
import { Question } from 'lib/shared-domain/questionnaire/domain';
import { questions } from 'lib/shared-domain/questionnaire/presentation/questions';

export const TaxCalculatorQuestionComponent: React.FC<{
  currentPositionInTotalNumberOfQuestion: number;
  currentQuestion: Question
  onPreviousQuestion: () => void
  onNextQuestion: () => void
}> = ({
  currentPositionInTotalNumberOfQuestion,
  currentQuestion,
  onPreviousQuestion,
  onNextQuestion,
}) => {
  const isFirstQuestion = currentPositionInTotalNumberOfQuestion === 1;

  return (
    <AnimateSharedLayout>
      {(() => {
        const answerType = currentQuestion?.answerSelector?.answerType;
        if (answerType === 'boxSelector') {
          return (
            <questions.BoxSelector
              onNextQuestion={onNextQuestion}
              onPrevQuestion={isFirstQuestion ? null : onPreviousQuestion}
              question={currentQuestion}
              currentPos={currentPositionInTotalNumberOfQuestion}
            />
          );
        } else if (answerType === 'textInput') {
          return (
            <questions.TextInput
              onNextQuestion={onNextQuestion}
              onPrevQuestion={isFirstQuestion ? null : onPreviousQuestion}
              question={currentQuestion}
              currentPos={currentPositionInTotalNumberOfQuestion}
            />
          );
        } else if (answerType === 'orbitSelector') {
          return (
            <questions.OrbitSelector
              onPrevQuestion={isFirstQuestion ? null : onPreviousQuestion}
              onNextQuestion={onNextQuestion}
              question={currentQuestion}
              currentPos={currentPositionInTotalNumberOfQuestion}
            />
          );
        } else if (answerType === 'multiTextInput') {
          return (
            <questions.MultiTextInput
              onPrevQuestion={isFirstQuestion ? null : onPreviousQuestion}
              onNextQuestion={onNextQuestion}
              question={currentQuestion}
              currentPos={currentPositionInTotalNumberOfQuestion}
            />
          );
        } else if (answerType === 'numberInput') {
          return (
            <questions.NumberInput
              onPrevQuestion={onPreviousQuestion}
              onNextQuestion={onNextQuestion}
              question={currentQuestion}
              currentPos={currentPositionInTotalNumberOfQuestion}
            />
          );
        }

        return null;
      })()}
    </AnimateSharedLayout>
  );
};
