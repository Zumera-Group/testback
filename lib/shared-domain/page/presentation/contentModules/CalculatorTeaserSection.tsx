import { FlexCol } from 'components/Layout/Flex/Flex';
import { CalculatorTeaser } from 'lib/shared-domain/questionnaire/presentation/CalculatorTeaser';
import React from 'react';
import { CalculatorTeaserSectionModule } from '../../domain/contentModule';

export const CalculatorTeaserSection: React.FC<{
  specificContentModule: CalculatorTeaserSectionModule;
}> = ({ specificContentModule }) => {
  return (
    <FlexCol
      backgroundImage={
        `url(${specificContentModule.getBackgroundImage()})` || ''
      }
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    >
      <CalculatorTeaser
        {...specificContentModule}
        questionnaireSlug={specificContentModule.questionnaireSlug}
      />
    </FlexCol>
  );
};

export default CalculatorTeaserSection;
