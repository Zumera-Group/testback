import React, { useMemo } from 'react';

import { Sector } from '../../domain';

import { SectorHeaderSectionModule } from '../../domain/contentModule';
import { SectorHeader } from 'lib/shared-domain/sectors/presentation/components/SectorHeader';
import { useSelectSector } from './TransactionGridSection/state';
import { useFetchSectors } from '../../../sectors/application/useGetSectors';

export const SectorHeaderSection: React.FC<{
  specificContentModule: SectorHeaderSectionModule;
}> = ({ specificContentModule }) => {
  const sectors = useFetchSectors();
  const sectorLength = sectors.length;
  const { sector } = useSelectSector();
  const randomIndex = useMemo(
    () => Math.floor(Math.random() * sectorLength - 2),
    [sectorLength],
  );

  const randomSector =
    sector && sector?.name !== 'ALL' ? sector : sectors[randomIndex];

  if (!randomSector) return null;

  return (
    <SectorHeader
      linkText={specificContentModule.buttonText}
      sector={randomSector}
    />
  );
};

export default SectorHeaderSection;
