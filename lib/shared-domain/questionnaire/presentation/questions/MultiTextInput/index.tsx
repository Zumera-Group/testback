import { useState } from 'react';
import Input from 'components/Form/Input/Input';
import { getTranslateByScope } from 'translation/i18n';
import { Question } from '../../../domain/index';
import { useAnswers } from 'lib/shared-domain/questionnaire/application/useAnswers';
import { QuestionText } from '../../Question/QuestionText';
import { QuestionButtonsWrapper } from '../../Question/QuestionButtonsWrapper';
import { QuestionButtons } from '../../Question/QuestionButtons';
import { useEffect } from 'react';
import { QuestionAnimation } from '../../Question/QuestionAnimation';
import styles from './MultiTextInput.module.scss';
import BackButton from 'components/Calculator/BackButton/BackButton';
import useBreakpoints from 'lib/utils/useBreakpoints';
import { useMediaQuery } from 'lib/hooks/useMediaQuery';
import { SCREEN_SIZE_MD } from 'lib/constants';

const t = getTranslateByScope('answerTypes.textInput');
const placeholder = t('basePlaceholder');

export const MultiTextInput: React.FC<{
  question: Question;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  currentPos: number;
}> = ({ question, onNextQuestion, currentPos, onPrevQuestion }) => {
  const { getAnswer, setAnswer } = useAnswers(question);
  const NUMBER_OF_ANSWERS = question.answerSelector.multiTextInput?.length;
  const [answers, setAnswers] = useState<string[]>(
    new Array(NUMBER_OF_ANSWERS).fill(''),
  );

  const isMobile = useMediaQuery(`(max-width: ${SCREEN_SIZE_MD})`);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) =>
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = e.target.value;
      return newAnswers;
    });

  useEffect(() => {
    const persistedAnswers = getAnswer()?.split?.(';');
    setAnswers(persistedAnswers || '');
  }, []);

  useEffect(() => {
    setAnswer(answers?.join?.(';'));
  }, [answers]);

  return (
    <>
      {isMobile && (
        <BackButton onPrevQuestion={onPrevQuestion} currentPos={currentPos} />
      )}
      <QuestionAnimation>
        <QuestionText title={question.questionText} />
        <div className={styles.multiTextInputWrapper}>
          {question.answerSelector.multiTextInput?.map((field, index) => (
            <div key={index} className={styles.inputItem}>
              <p>{field.fieldTitle}</p>
              <Input
                value={answers[index]}
                onChange={(e) => onChange(e, index)}
                placeholder={field.fieldPlaceholder || placeholder}
                type={'text'}
                id={`${index}`}
                hideLabel
              />
            </div>
          ))}
        </div>
      </QuestionAnimation>
      <QuestionButtonsWrapper>
        <div className={styles.buttonOuter}>
          {!isMobile && (
            <BackButton
              onPrevQuestion={onPrevQuestion}
              currentPos={currentPos}
            />
          )}
          <QuestionButtons
            onNextQuestion={onNextQuestion}
            isAnswered
            isRequired={false}
          />
        </div>
      </QuestionButtonsWrapper>
    </>
  );
};
