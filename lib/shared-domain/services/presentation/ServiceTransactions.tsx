import { Box, FlexCol } from 'components/Layout/Flex/Flex';
import React from 'react';
import backgroundImage from '../../../../public/serviceDetail/transactions-bg.png';

import { SectionContainer } from '../../../../components/Layout/SectionContainer';
import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';
import { getTranslateByScope } from 'translation/i18n';
import { TransactionCarousel } from 'lib/shared-domain/transactions/presentation/components/TransactionCarousel';
import { Transaction } from 'lib/shared-domain/transactions/domain';
import { ServiceTransactionsSection } from '../../page/domain/index';
import { useBreakpointValue } from '@chakra-ui/react';

const t = getTranslateByScope('website.serviceDetails.transactionsSection');

export const ServiceTransactions: React.FC<{
  section: ServiceTransactionsSection | any;
  transactions: Transaction[];
}> = ({ transactions, section }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  if (transactions.length === 0) return null;
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
        <Box width={{ base: '100%', lg: '50%' }}>
          <TitleWithSubtitleAndDescription
            description={section.description}
            title={section.title}
            subtitle={section.subtitle}
          />
        </Box>
      </SectionContainer>
      <Box mb={8}>
        <TransactionCarousel
          linkText={section.linkTextInTransactionCard}
          transactions={transactions}
        />
      </Box>
    </FlexCol>
  );
};
