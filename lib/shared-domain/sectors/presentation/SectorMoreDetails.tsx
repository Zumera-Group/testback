import React from 'react';

import { Sector } from '../../page/domain/index';

import SectorMoreDetailsWrapper from 'components/SectorMoreDetails/SectorMoreDetails';

export const SectorMoreDetails: React.FC<{ sector: Sector; content: any }> = ({
  sector,
}) => {
  if (!sector.moreDetailsSection) return null;
  return <SectorMoreDetailsWrapper {...sector.moreDetailsSection} />;
};
