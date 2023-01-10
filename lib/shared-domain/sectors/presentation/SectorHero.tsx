import React from 'react';

import { Sector } from '../../page/domain/index';

import { SectorHero as SHero } from 'components/Sector';

export const SectorHero: React.FC<{ sector: Sector; content: any }> = ({
  sector,
  content,
}) => {
  return (
    <SHero sector={sector} content={content} />
  );
};
