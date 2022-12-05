import React from 'react';
import { getTranslateByScope } from 'translation/i18n';

import { CalculatorTeaser } from '../../questionnaire/presentation/CalculatorTeaser';
import {
  Service,
  ServiceCalculatorTeaserSection,
} from '../../page/domain/index';

const t = getTranslateByScope('website.serviceDetails.questionnaire');

export const ServiceQuestionnaire: React.FC<{
  section: ServiceCalculatorTeaserSection;
}> = ({ section }) => {
  return (
    <CalculatorTeaser
      buttonText={section.buttonText}
      title={section.title}
      description={section.description}
      checkmarkTexts={section.checkmarkTexts}
      calculatorSteps={section.calculatorSteps}
      questionnaireSlug={section.questionnaire?.questionnaireSlug?.current}
    />
  );
};
