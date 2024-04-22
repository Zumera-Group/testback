import React, {useCallback, useMemo, ChangeEvent} from 'react';
import { getTranslateByScope } from 'translation/i18n';
import { Question } from '../../../domain/index';
import { useAnswers } from 'lib/shared-domain/questionnaire/application/useAnswers';
import { QuestionText } from '../../Question/QuestionText';
import { QuestionButtonsWrapper } from '../../Question/QuestionButtonsWrapper';
import { QuestionButtons } from '../../Question/QuestionButtons';
import { QuestionAnimation } from '../../Question/QuestionAnimation';
import { RequiredQuestionInfo } from '../../Question/RequiredQuestionInfo';
import { Textarea } from 'components/Form';
import styles from './TextInput.module.scss';
import BackButton from 'components/Calculator/BackButton/BackButton';
import { useMediaQuery } from 'lib/hooks/useMediaQuery';
import { SCREEN_SIZE_MD } from 'lib/constants';
import {useValuationStore} from '../../../store';
import {IApiField} from '../../../../../../@types/api';
import {TGlobalAlertType} from '../../../../../../@types/alert';

const t = getTranslateByScope('answerTypes.textInput');
const tValidators = getTranslateByScope('validators');

export const TextInput: React.FC<{
  question: Question;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  currentPos: number;
}> = ({ question, onNextQuestion, onPrevQuestion, currentPos }) => {
  const { salesforceFields, setGlobalAlert } = useValuationStore();
  const { getAnswer, setAnswer } = useAnswers(question);
  const isMobile = useMediaQuery(`(max-width: ${SCREEN_SIZE_MD})`);
  const placeholder = question.answerSelector?.textInput || t('basePlaceholder');
  console.log('---question:', question)
  const {field} = useMemo(() => {
    let field: IApiField|null = null;
    if (question.salesforceId && salesforceFields && question.salesforceId in salesforceFields) {
      field = salesforceFields[question.salesforceId];
    }
    return {field};
  }, [salesforceFields, question]);

  const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    let value = String(e.target.value);
    if (field.length > 0 && value.length > field.length) {
      value = value.substring(0, field.length);
      setGlobalAlert({
        type: TGlobalAlertType.warning,
        text: tValidators('maxLength', {max: String(field.length)})
      });
    }

    setAnswer(value);
  }, [field, setAnswer]);

  return (
    <>
      {isMobile && !!onPrevQuestion && (
        <BackButton onPrevQuestion={onPrevQuestion} currentPos={currentPos} />
      )}
      <QuestionAnimation>
        <QuestionText title={question?.questionText}>
          <RequiredQuestionInfo isRequired={question?.isRequired} />
        </QuestionText>

        <div className={styles.textInputWrapper}>
          <Textarea
            id={question._id}
            value={getAnswer()}
            onChange={onChange}
            placeholder={placeholder}
            hideLabel
          />
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
            isRequired={question?.isRequired}
            isAnswered={getAnswer()}
          />
        </div>
      </QuestionButtonsWrapper>
    </>
  );
};
