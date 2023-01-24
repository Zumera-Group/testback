import { useAnswers } from 'lib/shared-domain/questionnaire/application/useAnswers';
import { useNumberFormat } from 'lib/shared-domain/questionnaire/application/useNumberFormat';
import React from 'react';
import { Question } from '../../../domain/index';
import { Input } from 'components/Form';
import styles from './NumberInput.module.scss';
import { QuestionText } from '../../Question/QuestionText';

export const NumberInput: React.FC<{
  question: Question;
  onNextQuestion: () => void;
}> = ({ question, onNextQuestion }) => {
  const { valueType, placeholder, salesforceFormat, label } =
    question?.answerSelector?.numberInput;

  const shortBox =
    question?.answerSelector.numberInput.valueType === 'year' ||
    'age' ||
    'percent';

  console.log(question);

  const { getNumberFormat, sign } = useNumberFormat(valueType);
  const { getAnswer, setAnswer } = useAnswers(question);

  return (
    <div className={styles.numberInputWrapper}>
      <QuestionText
        title={question.questionText}
        description={question.description}
      />
      <Input
        type="number"
        id={question._id}
        placeholder={placeholder ?? placeholder}
        label={label}
        classes={[styles.numberInput, shortBox && styles.shortBox].join(' ')}
      />
    </div>
  );
};
