import { useState } from 'react';
import { VStack } from '@chakra-ui/react';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';
import Input from 'components/Form/Input/Input';
import { getTranslateByScope } from 'translation/i18n';
import { Question } from '../../../domain/index';
import { useAnswers } from 'lib/shared-domain/questionnaire/application/useAnswers';
import { QuestionText } from '../../Question/QuestionText';
import { QuestionButtonsWrapper } from '../../Question/QuestionButtonsWrapper';
import { QuestionButtons } from '../../Question/QuestionButtons';
import { P } from '../../../../../../components/Typography/P';
import { useEffect } from 'react';
import { QuestionAnimation } from '../../Question/QuestionAnimation';
import styles from './MultiTextInput.module.scss';
import BackButton from 'components/Calculator/BackButton/BackButton';

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

  const isMobile = useBreakpointValue({ base: true, lg: false });

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
            <VStack key={index} align="stretch" className={styles.inputItem}>
              <P variant="multiTextInputP" color={'white'} mb={2}>
                {field.fieldTitle}
              </P>
              <Input
                value={answers[index]}
                onChange={(e) => onChange(e, index)}
                placeholder={field.fieldPlaceholder || placeholder}
                type={'text'}
                id={`${index}`}
                hideLabel
              />
            </VStack>
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
