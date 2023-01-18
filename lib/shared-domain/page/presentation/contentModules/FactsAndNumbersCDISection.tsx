import React from 'react';

import { FactsAndNumbersCDISectionModule } from '../../domain/contentModule';
import { FactsAndNumbersCDISection as FactsAndNumbersCDISectionComponent } from 'components/FactsAndNumbersCDISection';

export const FactsAndNumbersCDISection: React.FC<{
  specificContentModule: FactsAndNumbersCDISectionModule;
}> = ({ specificContentModule }) => {
  return <FactsAndNumbersCDISectionComponent {...specificContentModule} />;
};

export default FactsAndNumbersCDISection;
