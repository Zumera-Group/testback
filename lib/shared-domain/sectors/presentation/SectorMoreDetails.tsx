import React from 'react';

import { Sector } from '../../page/domain/index';

import SectorMoreDetailsWrapper from 'components/SectorMoreDetails/SectorMoreDetails'

export const SectorMoreDetails: React.FC<{ sector: Sector }> = ({
  sector,
}) => {
  if (!sector.moreDetailsSection) return null;
  console.log(sector, 'sector')
  return (
    <SectorMoreDetailsWrapper {...sector.moreDetailsSection} />
  );
};
