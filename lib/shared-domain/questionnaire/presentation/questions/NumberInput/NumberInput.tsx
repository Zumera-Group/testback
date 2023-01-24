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

enum VALUE_TYPE {
  EUR = '€',
  USD = '$',
  percent = '%',
}

export const NumberInput: React.FC<{
  question: Question;
  onNextQuestion: () => void;
}> = ({ question, onNextQuestion }) => {
  const { valueType, placeholder, salesforceFormat, label } =
    question?.answerSelector?.numberInput;
  const { getNumberFormat, sign } = useNumberFormat(valueType);
  const { getAnswer, setAnswer } = useAnswers(question);

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
      <QuestionText
        title={question.questionText}
        description={question.description}
      />
      <p className={styles.fieldLabel}>{label}</p>
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
      <QuestionButtons
        onNextQuestion={() => {
          onNextQuestion();
        }}
        isRequired={question?.isRequired}
        isAnswered={getUnformattedAnswer() != null}
        btnAlignLeft
      />
    </div>
  );
};
