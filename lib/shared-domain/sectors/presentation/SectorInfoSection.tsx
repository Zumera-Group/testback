import React from 'react';

import { Sector } from '../../page/domain/index';
import { Transaction } from 'lib/shared-domain/transactions/domain';
import { SiteSettings } from 'lib/shared-domain/page/domain';

import { SectorInfo } from 'components/Sector';

export const SectorInfoSection: React.FC<{
  sector: Sector;
  sectorTransactions: Transaction[];
  siteSettings: SiteSettings;
  content: any;
  sharedContent?: any;
}> = ({ sector, sectorTransactions, siteSettings, sharedContent, content }) => {
  return (
    <SectorInfo
      sector={sector}
      sectorTransactions={sectorTransactions}
      // siteSettings={sectorTransactions}
      content={content}
      // sharedContent={sharedContent}
    />
  );
};

export default SectorInfoSection;
