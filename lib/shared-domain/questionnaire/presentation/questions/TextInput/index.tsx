import React from 'react';
import { Box } from '@chakra-ui/react';
import { Textarea } from 'components/Inputs';
import { getTranslateByScope } from 'translation/i18n';
import { Question } from '../../../domain/index';
import { useAnswers } from 'lib/shared-domain/questionnaire/application/useAnswers';
import { QuestionText } from '../../Question/QuestionText';
import { QuestionButtons } from '../../Question/QuestionButtons';
import { QuestionAnimation } from '../../Question/QuestionAnimation';
import { RequiredQuestionInfo } from '../../Question/RequiredQuestionInfo';

const t = getTranslateByScope('answerTypes.textInput');

export const TextInput: React.FC<{
  question: Question;
  onNextQuestion: () => void;
}> = ({ question, onNextQuestion }) => {
  const { getAnswer, setAnswer } = useAnswers(question);

  const placeholder =
    question.answerSelector?.textInput || t('basePlaceholder');

  return (
    <>
      <QuestionText title={question?.questionText}>
        <RequiredQuestionInfo isRequired={question?.isRequired} />
      </QuestionText>
      <QuestionAnimation>
        <Box mx="auto" maxWidth={600} mt={5} mb={6}>
          <Textarea
            value={getAnswer()}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={placeholder}
            minHeight={200}
            maxHeight={200}
            resize="none"
            overflowY="scroll"
          />
        </Box>
      </QuestionAnimation>

      <QuestionButtons
        onNextQuestion={onNextQuestion}
        isRequired={question?.isRequired}
        isAnswered={getAnswer()}
      />
    </>
  );
};
