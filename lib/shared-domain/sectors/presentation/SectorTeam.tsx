import React from 'react';

import { Sector } from '../../page/domain/index';

import { SectorTeam as Team } from 'components/Sector';

export const SectorTeam: React.FC<{ sector: Sector; hideLink?: boolean }> = ({ sector, hideLink = false }) => {
  if (
    !sector.contributors ||
    sector.contributors.length === 0 ||
    !sector.teamSection
  ) return null;
  return (
    <Team sector={sector} hideLink={hideLink} />
  );
};

export default SectorTeam;