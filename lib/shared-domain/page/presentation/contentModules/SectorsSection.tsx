import React from 'react';

import { SectorsSectionModule } from '../../domain/contentModule';

import Sectors from 'components/Sectors';

export const SectorsSection: React.FC<{
  specificContentModule: SectorsSectionModule;
}> = ({ specificContentModule }) => {
  return (
    <Sectors {...specificContentModule} />
  );
};


export default SectorsSection;