import React from 'react';
import { QuestionText } from './QuestionText/index';
import { getTranslateByScope } from '../../../../../translation/i18n';
import { P } from 'components/Typography/P';
import { colors } from '../../../../../styles/foundations/colors';
import { ResultTeaser } from '../CalculatorTeaser';
import { QuestionButtons } from './QuestionButtons';
import { useValuationStore } from '../../store/index';
import { QuestionAnimation } from './QuestionAnimation';
import BackButton from 'components/Calculator/BackButton/BackButton';
import styles from './SectorSpecificEntry.module.scss';
import { useMediaQuery } from 'lib/hooks/useMediaQuery';
import { SCREEN_SIZE_MD } from 'lib/constants';
import QuestionButtonsWrapper from './QuestionButtonsWrapper';

const t = getTranslateByScope('sectorSpecificEntry');

const calculatorSteps = {
  step1: t('step1'),
  step2: t('step2'),
  step3: t('step3'),
  step4: t('step4'),
};

export const SectorSpecificEntry: React.FC<{
  onNextQuestion(): void;
  onPrevQuestion(): void;
  currentPos: number;
  industry: string;
}> = ({ onNextQuestion, industry, currentPos, onPrevQuestion }) => {
  const firstButtonText = t('firstButtonText', { industry });
  const { setIsOnResultScreen } = useValuationStore();
  const secondButtonText = t('secondButtonText');
  const onFinishQuestionnaire = () => setIsOnResultScreen(true);
  const isMobile = useMediaQuery(`(max-width: ${SCREEN_SIZE_MD})`);
  return (
    <>
      {isMobile && (
        <BackButton onPrevQuestion={onPrevQuestion} currentPos={currentPos} />
      )}
      <QuestionAnimation>
        <QuestionText title={t('questionText')} />
        <P variant="mobileSectorSpecificEntryP" color={'white'} pl={'0.75rem'}>
          {t('subtitle')}
        </P>
        <ResultTeaser calculatorSteps={calculatorSteps} isSectorSpecificEntry />
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
            firstButtonText={firstButtonText}
            secondButtonText={secondButtonText}
            onNextQuestion={onNextQuestion}
            onFinishQuestionnaire={onFinishQuestionnaire}
            isRequired={false}
            isAnswered
            stackMobile
          />
        </div>
      </QuestionButtonsWrapper>
    </>
  );
};
