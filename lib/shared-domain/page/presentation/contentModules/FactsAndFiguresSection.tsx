import React from 'react';

import { FactsAndFiguresSectionModule } from '../../domain/contentModule';

import FactsAndFigures from 'components/FactsAndFigures';

export const FactsAndFiguresSection: React.FC<{
  specificContentModule: FactsAndFiguresSectionModule;
}> = ({ specificContentModule }) => {
  return (
    <FactsAndFigures {...specificContentModule} />
  );
};

export default FactsAndFiguresSection;
