import React from 'react';
import { getTranslateByScope } from 'translation/i18n';

import { CalculatorTeaser } from '../../questionnaire/presentation/CalculatorTeaser';
import { Sector } from '../../page/domain/index';

const t = getTranslateByScope('website.sectorDetails.questionnaire');

export const SectorQuestionnaire: React.FC<{
  sector: Sector;
}> = ({ sector }) => {
  return (
    <CalculatorTeaser
      buttonText={t('buttonText')}
      title={t('title')}
      description={t('description')}
      checkmarkTexts={[
        t('checkmarkTexts1'),
        t('checkmarkTexts2'),
        t('checkmarkTexts3'),
      ]}
      calculatorSteps={{
        step1: t('calculatorSteps.step1'),
        step2: t('calculatorSteps.step2'),
        step3: t('calculatorSteps.step3'),
        step4: t('calculatorSteps.step4'),
      }}
      // questionnaireSlug={sector?.questionnaire?.questionnaireSlug?.current}
    />
  );
};
