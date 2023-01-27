import { useAnswers } from 'lib/shared-domain/questionnaire/application/useAnswers';
import { useNumberFormat } from 'lib/shared-domain/questionnaire/application/useNumberFormat';
import React, { useState } from 'react';
import { Question } from '../../../domain/index';
import { Input } from 'components/Form';
import styles from './NumberInput.module.scss';
import { QuestionText } from '../../Question/QuestionText';
import {
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarYears,
} from 'date-fns';
import { QuestionButtons } from '../../Question/QuestionButtons';
import { QuestionAnimation } from '../../Question/QuestionAnimation';
import { DEFAULT_VALUES } from './constants';
import BackButton from 'components/Calculator/BackButton/BackButton';
import { useMediaQuery } from 'lib/hooks/useMediaQuery';
import { SCREEN_SIZE_MD } from 'lib/constants';

export const NumberInput: React.FC<{
  question: Question;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  currentPos: any;
}> = ({ question, onNextQuestion, onPrevQuestion, currentPos }) => {
  const { valueType, placeholder, salesforceFormat, label } =
    question?.answerSelector?.numberInput || DEFAULT_VALUES;
  const { getNumberFormat, sign } = useNumberFormat(valueType);
  const { getAnswer, setAnswer } = useAnswers(question);
  const isMobile = useMediaQuery(`(max-width: ${SCREEN_SIZE_MD})`);

  const formatToSalesforce = (v: number) => {
    const today = new Date();
    if (!salesforceFormat || salesforceFormat === 'number') setAnswer(v);
    if (salesforceFormat === 'date_year') {
      today.setFullYear(today.getFullYear() + v);
      setAnswer(today);
    }
    if (salesforceFormat === 'date_month') {
      today.setMonth(today.getMonth() + v);
      setAnswer(today);
    }
    if (salesforceFormat === 'date_day') {
      today.setDate(today.getDate() + v);
      setAnswer(today);
    }
  };

  const getUnformattedAnswer = () => {
    if (!salesforceFormat || salesforceFormat === 'number') return getAnswer();
    const today = new Date();
    const valueDate = new Date(getAnswer());
    const year = differenceInCalendarYears(valueDate, today);
    const month = differenceInCalendarMonths(valueDate, today);
    const day = differenceInCalendarDays(valueDate, today);

    if (salesforceFormat === 'date_year') return year;
    if (salesforceFormat === 'date_month') return month;
    if (salesforceFormat === 'date_day') return day;
  };
  const shortBox = salesforceFormat !== 'number' || valueType === 'year';

  return (
    <div className={styles.numberInputWrapper}>
      {isMobile && (
        <BackButton onPrevQuestion={onPrevQuestion} currentPos={currentPos} />
      )}
      <QuestionText
        title={question.questionText}
        description={question.description}
      />
      <QuestionAnimation>
        {label && <p className={styles.fieldLabel}>{label}</p>}
        <div className={styles.fieldWrapper}>
          {sign && <span className={styles.sign}> {sign}</span>}
          <Input
            type="number"
            id={question._id}
            placeholder={placeholder ? placeholder : '0'}
            hideLabel
            classes={[
              styles.numberInput,
              shortBox && styles.shortBox,
              !sign && styles.noSign,
            ].join(' ')}
            value={getUnformattedAnswer()}
            onChange={(e) => formatToSalesforce(Number(e.target.value))}
          />
        </div>
        <div className={styles.buttonOuter}>
          {!isMobile && (
            <BackButton
              onPrevQuestion={onPrevQuestion}
              currentPos={currentPos}
            />
          )}

          <QuestionButtons
            onNextQuestion={() => {
              onNextQuestion();
            }}
            isRequired={question?.isRequired}
            isAnswered={getUnformattedAnswer() != null}
          />
        </div>
      </QuestionAnimation>
    </div>
  );
};
