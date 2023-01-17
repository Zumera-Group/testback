import React from 'react';
import { Transaction } from '../domain/index';
import { getTranslateByScope } from 'translation/i18n';

import { SectorHeader } from 'lib/shared-domain/sectors/presentation/components/SectorHeader';

export const TransactionSector: React.FC<{
  transaction: Transaction;
  content: any;
}> = ({ transaction, content }) => {
  const t = (item) => content?.[item];
  const firstSector = transaction.sectors?.[0];

  if (!firstSector) return null;

  return (
    <SectorHeader
      linkText={t('linkText')}
      sector={firstSector}
      subtitle={t('subtitle')}
    />
  );
};
