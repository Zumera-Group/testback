import { Box } from 'components/Layout/Flex/Flex';
import React from 'react';
import { SectionContainer } from '../../../../components/Layout/SectionContainer';
import { Transaction } from '../domain/index';
import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';
import { getTranslateByScope } from 'translation/i18n';
import { SimpleGrid } from '@chakra-ui/react';
import { EmployeeCard } from '../../employees/presentation/EmployeeCard';

export const TransactionTeam: React.FC<{
  transaction: Transaction;
  content: any;
}> = ({ transaction, content }) => {
  const t = (item) => content?.[item];

  if (!transaction.peopleInvolved || transaction.peopleInvolved.length === 0)
    return null;

  return (
    <SectionContainer py="md">
      <Box width={{ base: '100%', lg: '50%' }}>
        <TitleWithSubtitleAndDescription
          description={t('description')}
          title={t('title')}
          subtitle={t('subtitle')}
        />
      </Box>
      <SimpleGrid mt={8} columns={{ base: 1, md: 2, lg: 3 }} spacing={3}>
        {transaction.peopleInvolved?.map((p, index) => (
          <EmployeeCard linkText={t('linkText')} employee={p} key={index} />
        ))}
      </SimpleGrid>
    </SectionContainer>
  );
};
