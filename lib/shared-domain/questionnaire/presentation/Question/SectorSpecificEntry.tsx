import React from 'react';
import { QuestionText } from './QuestionText/index';
import { getTranslateByScope } from '../../../../../translation/i18n';
import { P } from 'components/Typography/P';
import { colors } from '../../../../../styles/foundations/colors';
import { ResultTeaser } from '../CalculatorTeaser';
import { QuestionButtons } from './QuestionButtons';
import { useValuationStore } from '../../store/index';
import { QuestionAnimation } from './QuestionAnimation';

const t = getTranslateByScope('sectorSpecificEntry');

const calculatorSteps = {
  step1: t('step1'),
  step2: t('step2'),
  step3: t('step3'),
  step4: t('step4'),
};

export const SectorSpecificEntry: React.FC<{
  onNextQuestion(): void;
  industry: string;
}> = ({ onNextQuestion, industry }) => {
  const firstButtonText = t('firstButtonText', { industry });
  const { setIsOnResultScreen } = useValuationStore();
  const secondButtonText = t('secondButtonText');
  const onFinishQuestionnaire = () => setIsOnResultScreen(true);
  return (
    <>
      <QuestionText title={t('questionText')} />
      <QuestionAnimation>
        <P variant="mobileSectorSpecificEntryP" color={'white'} pl={'0.75rem'}>
          {t('subtitle')}
        </P>
        <ResultTeaser calculatorSteps={calculatorSteps} isSectorSpecificEntry />
      </QuestionAnimation>
      <QuestionButtons
        firstButtonText={firstButtonText}
        secondButtonText={secondButtonText}
        onNextQuestion={onNextQuestion}
        onFinishQuestionnaire={onFinishQuestionnaire}
        isRequired={false}
        isAnswered
        stackMobile
      />
    </>
  );
};
