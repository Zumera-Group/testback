import { QuestionButtons } from 'lib/shared-domain/questionnaire/presentation/Question/QuestionButtons';
import { useValuationStore } from 'lib/shared-domain/questionnaire/store';
import { useAnswers } from 'lib/shared-domain/questionnaire/application/useAnswers';
import styles from './BottomBar.module.scss';
import { qLogs } from 'lib/shared-domain/questionnaire/application/log';
import { useSalesforceAnswerSync } from 'lib/shared-domain/questionnaire/application/useSalesforceAnswerSync';
import { INDUSTRY_QUESTION_ID } from 'lib/shared-domain/questionnaire/presentation/questions';
import { useContext } from 'react';

interface Props {
  currentStep: number;
  totalQuestions: number;
}

const BottomBar: React.FC<Props> = ({ currentStep, totalQuestions }) => {
  const { questionnaire, mainStep, subStep, uniqueId, industryId } =
    useValuationStore();

  const currentCategory = questionnaire?.questionsByCategory?.[mainStep];
  const categoryQuestions = currentCategory?.questions;
  const currentQuestion =
    questionnaire && categoryQuestions && categoryQuestions[subStep];
  const answerSelector = questionnaire && currentQuestion?.answerSelector;
  const answerType = questionnaire && answerSelector?.answerType;
  console.log(answerType);

  return (
    <div className={styles.bottomBarWrapper}>
      <div className={styles.questionIndicator}>
        Question {currentStep} / {totalQuestions}
      </div>
      <div>Right</div>
      {/* <QuestionButtons
        onNextQuestion={onNextQuestion}
        isRequired={question?.isRequired}
        isAnswered={getAnswer()}
      /> */}
    </div>
  );
};

export default BottomBar;
