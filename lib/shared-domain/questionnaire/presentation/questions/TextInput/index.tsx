import React from 'react';
// import { Box } from '@chakra-ui/react';
import { getTranslateByScope } from 'translation/i18n';
import { Question } from '../../../domain/index';
import { useAnswers } from 'lib/shared-domain/questionnaire/application/useAnswers';
import { QuestionText } from '../../Question/QuestionText';
import { QuestionButtonsWrapper } from '../../Question/QuestionButtonsWrapper';
import { QuestionButtons } from '../../Question/QuestionButtons';
import { QuestionAnimation } from '../../Question/QuestionAnimation';
import { RequiredQuestionInfo } from '../../Question/RequiredQuestionInfo';
import Textarea from 'components/Form/Textarea/Textarea';
import styles from './TextInput.module.scss';
import BackButton from 'components/Calculator/BackButton/BackButton';
import { useMediaQuery } from 'lib/hooks/useMediaQuery';
import { SCREEN_SIZE_MD } from 'lib/constants';

const t = getTranslateByScope('answerTypes.textInput');

export const TextInput: React.FC<{
  question: Question;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  currentPos: number;
}> = ({ question, onNextQuestion, onPrevQuestion, currentPos }) => {
  const { getAnswer, setAnswer } = useAnswers(question);
  const isMobile = useMediaQuery(`(max-width: ${SCREEN_SIZE_MD})`);
  const placeholder =
    question.answerSelector?.textInput || t('basePlaceholder');

  return (
    <>
      {isMobile && (
        <BackButton onPrevQuestion={onPrevQuestion} currentPos={currentPos} />
      )}
      <QuestionAnimation>
        <QuestionText title={question?.questionText}>
          <RequiredQuestionInfo isRequired={question?.isRequired} />
        </QuestionText>

        {/*<Box mt={5} mb={6} className={styles.textInputWrapper}>*/}
        {/*  <Textarea*/}
        {/*    id={question._id}*/}
        {/*    value={getAnswer()}*/}
        {/*    onChange={(e) => setAnswer(e.target.value)}*/}
        {/*    placeholder={placeholder}*/}
        {/*  />*/}
        {/*</Box>*/}
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
            isRequired={question?.isRequired}
            isAnswered={getAnswer()}
          />
        </div>
      </QuestionButtonsWrapper>
    </>
  );
};
