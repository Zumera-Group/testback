import React from 'react';

import { Sector } from '../../page/domain/index';

import { SectorTeam as Team } from 'components/Sector';

export const SectorTeam: React.FC<{ sector: Sector }> = ({ sector }) => {
  if (
    !sector.contributors ||
    sector.contributors.length === 0 ||
    !sector.teamSection
  ) return null;
  return (
    <Team sector={sector} />
  );
};

export default SectorTeam;