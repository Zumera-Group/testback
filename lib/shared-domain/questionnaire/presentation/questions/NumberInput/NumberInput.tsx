import React, { useState, useRef, useEffect } from 'react';
import { useAnswers } from 'lib/shared-domain/questionnaire/application/useAnswers';
import { useNumberFormat } from 'lib/shared-domain/questionnaire/application/useNumberFormat';
import { Question } from '../../../domain/index';
import { Input } from 'components/Form';
import styles from './NumberInput.module.scss';
import { QuestionText } from '../../Question/QuestionText';
import {
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarYears,
} from 'date-fns';
import { QuestionButtonsWrapper } from '../../Question/QuestionButtonsWrapper';
import { QuestionButtons } from '../../Question/QuestionButtons';
import { QuestionAnimation } from '../../Question/QuestionAnimation';
import { DEFAULT_VALUES } from './constants';
import BackButton from 'components/Calculator/BackButton/BackButton';
import { useMediaQuery } from 'lib/hooks/useMediaQuery';
import { SCREEN_SIZE_MD } from 'lib/constants';
import router from 'next/router';

export const NumberInput: React.FC<{
  question: Question;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  currentPos: any;
}> = ({ question, onNextQuestion, onPrevQuestion, currentPos }) => {
  const { valueType, placeholder, salesforceFormat, label } =
    question?.answerSelector?.numberInput || DEFAULT_VALUES;
  const { getNumberFormat, sign } = useNumberFormat(valueType);
  const { getAnswer, setAnswer, removeAnswer } = useAnswers(question);
  const isMobile = useMediaQuery(`(max-width: ${SCREEN_SIZE_MD})`);
  const [inputLength, setInputLength] = useState(0);
  const isYear = valueType === 'year';
  const fieldWrapperRef = useRef(null);

  const longFormatType =
    valueType !== 'year' &&
    valueType !== 'age' &&
    salesforceFormat !== 'date_year' &&
    salesforceFormat !== 'date_month' &&
    salesforceFormat !== 'date_day'
      ? true
      : false;

  const localeFormat = router.locale === 'en' ? 'en-GB' : 'de-DE';

  const evCalcFields = [
    'Annual_Revenue_2021__c',
    'Annual_Revenue_2022__c',
    'Annual_Revenue_2023__c',
    'Annual_Revenue_2024__c',
    'Company_EBIT_2021__c',
    'Company_EBIT_2022__c',
    'Company_EBIT_2023__c',
    'Company_EBIT_2024__c',
  ];

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

  const shortBox =
    salesforceFormat !== 'number' ||
    valueType === 'year' ||
    valueType === 'percent';

  useEffect(() => {
    if (!fieldWrapperRef.current) return;
    if (!shortBox) return;
    const childInput = fieldWrapperRef.current.querySelector('input');
    const resizeInput = () => {
      if (childInput.value.length > 4) {
        childInput.style.width = `${childInput.value.length * 0.9375}ch`;
      } else {
        childInput.style.width = 'var(--input-width)';
      }
    };
    if (childInput) resizeInput();
  }, [fieldWrapperRef, question, inputLength, shortBox]);

  return (
    <>
      <div className={styles.numberInputWrapper}>
        {isMobile && (
          <BackButton onPrevQuestion={onPrevQuestion} currentPos={currentPos} />
        )}
        <QuestionAnimation>
          <QuestionText
            title={question.questionText}
            description={question.description}
          />
          {label && <p className={styles.fieldLabel}>{label}</p>}
          <div className={styles.fieldWrapper} ref={fieldWrapperRef}>
            {sign && sign !== '%' && (
              <span className={styles.sign}> {sign}</span>
            )}
            <Input
              type={longFormatType ? 'text' : 'number'}
              id={question._id}
              placeholder={placeholder ? placeholder : '0'}
              hideLabel
              autoFocus
              classes={[
                styles.numberInput,
                shortBox ? styles.numberInput__shortBox : '',
                !sign || sign === '%' ? styles.numberInput__noSign : '',
              ].join(' ')}
              value={
                longFormatType
                  ? getUnformattedAnswer()?.toLocaleString(localeFormat) || ''
                  : getUnformattedAnswer() || ''
              }
              onChange={(e) => {
                formatToSalesforce(Number(e.target.value.replace(/[.,]/g, '')));
                setInputLength(e.target.value.length);
                if (e.target.value === '') {
                  removeAnswer(e.target.value);
                }
              }}
            />

            {sign && sign === '%' && (
              <span className={styles.sign}>{sign}</span>
            )}
          </div>
        </QuestionAnimation>
      </div>
      <QuestionButtonsWrapper>
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
            isAnswered={
              (!isYear && getUnformattedAnswer() != null) ||
              (isYear && inputLength >= 4)
            }
          />
        </div>
      </QuestionButtonsWrapper>
    </>
  );
};
