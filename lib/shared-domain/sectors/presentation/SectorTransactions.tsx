import { Box, FlexCol } from 'components/Layout/Flex/Flex';
import React from 'react';
import backgroundImage from '../../../../public/sectorDetail/transactions-bg.png';

import { SectionContainer } from '../../../../components/Layout/SectionContainer';
import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';
import { getTranslateByScope } from 'translation/i18n';
import { TransactionCarousel } from 'lib/shared-domain/transactions/presentation/components/TransactionCarousel';
import { Transaction } from 'lib/shared-domain/transactions/domain';
import { Sector } from '../../page/domain/index';
import { useBreakpointValue } from '@chakra-ui/react';

const t = getTranslateByScope('website.sectorDetails.transactionsSection');

export const SectorTransactions: React.FC<{
  transactions: Transaction[];
  sector: Sector;
  content: any;
}> = ({ transactions, sector, content }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  if (!transactions || transactions.length === 0) return null;
  const t = (item) => content?.[item];

  const filteredTransactions = transactions.filter(
    (t) =>
      t.sectors && t.sectors?.map((s) => s?._id).indexOf(sector._id) !== -1,
  );

  if (filteredTransactions.length === 0) return null;

  return (
    <FlexCol
      width="100%"
      justifyContent="center"
      backgroundImage={`url(${backgroundImage.src})`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      position="relative"
      backgroundAttachment={!isMobile && 'fixed'}
    >
      <SectionContainer py="md">
        <Box width={{ base: '100%', lg: '60%' }} mb={5}>
          <TitleWithSubtitleAndDescription
            description={t('description')}
            title={t('title')}
            subtitle={t('subtitle')}
          />
        </Box>
        <TransactionCarousel
          mt={0}
          linkText={t('linkText')}
          transactions={filteredTransactions}
        />
      </SectionContainer>
    </FlexCol>
  );
};
