import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Question } from 'lib/shared-domain/questionnaire/domain';
import { useAnswers } from 'lib/shared-domain/questionnaire/application/useAnswers';
import { QuestionButtons } from '../../Question/QuestionButtons';
import { QuestionText } from '../../Question/QuestionText';
import { QuestionAnimation } from '../../Question/QuestionAnimation';
import { RequiredQuestionInfo } from '../../Question/RequiredQuestionInfo';
import BackButton from 'components/Calculator/BackButton/BackButton';

import styles from './Orbit.module.scss';
import { useMediaQuery } from 'lib/hooks/useMediaQuery';
import { SCREEN_SIZE_MD } from 'lib/constants';

export interface AnswerOption {
  value: string;
  position: number;
}

export const OrbitSelector: React.FC<{
  question: Question;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  currentPos: number;
}> = ({ question, onNextQuestion, onPrevQuestion, currentPos }) => {
  const { getAnswer, setAnswer } = useAnswers(question);
  const isMobile = useMediaQuery(`(max-width: ${SCREEN_SIZE_MD})`);
  const [value, setValue] = useState(10);
  const rangeInput = useRef(null);
  const MAX_VAL = 100;

  const updateRange = () => {
    const value = rangeInput.current.value;
    rangeInput.current.style.background = `linear-gradient(to right, #f0005c 0%, #f0005c ${value}%, #300032 ${value}%, #300032 100%)`;
  };

  useEffect(() => {
    updateRange();
  }, []);

  //all answers options from sanity
  const answers = question.answerSelector.orbitSelector.answerOptions;

  //length of answer array
  const answerLength =
    question.answerSelector.orbitSelector.answerOptions.length;

  //how much chart will be divided into
  const segments = (answerLength / MAX_VAL) * 100;

  //the value of each label e.g. 25% each in this case
  const labelVal = MAX_VAL / segments;

  // console.log(100 / segments);
  // console.log(question.answerSelector.orbitSelector.answerOptions);

  //for each answer get index and times by the divided segment value
  //so 1 x 25, 2 x 25 etc..
  // if the label value is greater than the value from the range but less than the value from other labels, then show
  answers.forEach((el) => {
    const index = answers.indexOf(el) + 1;

    if (labelVal * index > value) {
      console.log(index);
    }
  });

  return (
    <QuestionAnimation>
      {isMobile && (
        <BackButton onPrevQuestion={onPrevQuestion} currentPos={currentPos} />
      )}
      <QuestionText title={question.questionText}>
        <RequiredQuestionInfo isRequired={question?.isRequired} />
      </QuestionText>

      <div className={styles.rangeWrapper}>
        <output
          className={styles.donut}
          style={
            {
              '--percentage': value,
            } as React.CSSProperties
          }
        />
        <input
          ref={rangeInput}
          className={styles.range}
          type="range"
          min={0}
          max={MAX_VAL}
          value={value}
          onInput={updateRange}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </div>

      <div className={styles.buttonOuter}>
        {!isMobile && (
          <BackButton onPrevQuestion={onPrevQuestion} currentPos={currentPos} />
        )}

        <QuestionButtons
          onNextQuestion={onNextQuestion}
          isRequired={question?.isRequired}
          isAnswered={getAnswer()}
        />
      </div>
    </QuestionAnimation>
  );
};
