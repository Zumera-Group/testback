import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Question } from 'lib/shared-domain/questionnaire/domain';
import { useAnswers } from 'lib/shared-domain/questionnaire/application/useAnswers';
import { QuestionButtons } from '../../Question/QuestionButtons';
import { QuestionText } from '../../Question/QuestionText';
import { QuestionAnimation } from '../../Question/QuestionAnimation';
import { RequiredQuestionInfo } from '../../Question/RequiredQuestionInfo';
import { Donut } from './Donut';
import { AnswerLabel } from './AnswerLabel';
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
  const rangeInputRef = useRef(null);

  const { getAnswer, setAnswer } = useAnswers(question);

  const RANGE_MIN_VALUE = 0;
  const RANGE_MAX_VALUE = 100;
  const answers = question.answerSelector.orbitSelector.answerOptions;
  const TOTAL_SEGMENTS = (answers.length / RANGE_MAX_VALUE) * RANGE_MAX_VALUE;
  const STEPS = RANGE_MAX_VALUE / TOTAL_SEGMENTS;

  const isMobile = useMediaQuery(`(max-width: ${SCREEN_SIZE_MD})`);

  const [rangeValue, setRangeValue] = useState(80);
  const [chosenAnswer, setChosenAnswer] = useState(answers[0]);

  const updateRange = () => {
    const rangeInput = rangeInputRef.current;
    const rangeTrackBg = 'var(--range-track-bg)';
    const rangeProgressBg = 'var(--range-progress-bg)';
    const value =
      ((rangeInput.value - rangeInput.min) /
        (rangeInput.max - rangeInput.min)) *
      100;
    rangeInput.style.background = `
      linear-gradient(
        to right,
        ${rangeProgressBg} 0%,
        ${rangeProgressBg} ${value}%,
        ${rangeTrackBg} ${value}%,
        ${rangeTrackBg} 100%
      )`;
  };

  const updateAnswer = (value: number) => {
    setRangeValue(value);
    const FRACTION = Math.ceil(value / STEPS) * STEPS;
    const answerIndex = Math.min(
      Math.max(FRACTION / STEPS - 1, 0),
      TOTAL_SEGMENTS,
    );

    setChosenAnswer(answers[answerIndex]);

    // E.g. Large Impact
    setAnswer(`${answers[answerIndex]?.value}`);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    updateRange();
  }, [rangeValue]);

  useEffect(() => {
    const previousAnswer = getAnswer();
    let formattedAnswerAsNumber;
    if (previousAnswer) {
      // E.g. Large Impact index is 3, so add 1 and times by steps to get the correct previous answer value

      const prevAnswerIndex =
        answers.map((answer) => answer.value).indexOf(previousAnswer) + 1;

      formattedAnswerAsNumber = prevAnswerIndex * STEPS;
    } else {
      formattedAnswerAsNumber = rangeValue;
    }

    updateAnswer(formattedAnswerAsNumber);
  }, []);

  return (
    <QuestionAnimation>
      {isMobile && (
        <BackButton onPrevQuestion={onPrevQuestion} currentPos={currentPos} />
      )}

      <QuestionText title={question.questionText}>
        <RequiredQuestionInfo isRequired={question?.isRequired} />
      </QuestionText>

      <div className={styles.rangeWrapper}>
        <div className={styles.donutWrapper}>
          <Donut progress={rangeValue} total={RANGE_MAX_VALUE} />
          <AnswerLabel answer={chosenAnswer?.label} />
        </div>
        <input
          ref={rangeInputRef}
          className={styles.rangeSlider}
          type="range"
          min={RANGE_MIN_VALUE}
          max={RANGE_MAX_VALUE}
          value={rangeValue}
          onChange={(e) => updateAnswer(Number(e.target.value))}
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
