import { Box } from 'components/Layout/Flex/Flex';
import React from 'react';

import { TeamSectionModule } from '../../domain/contentModule';
import { TitleWithSubtitleAndDescription } from '../components/TitleWithSubtitleAndDescription';

import { SectionContainer } from 'components/Layout/SectionContainer';
import { Employee } from '../../../employees/domain/index';
import { SimpleGrid } from '@chakra-ui/react';
import { EmployeeCard } from 'lib/shared-domain/employees/presentation/EmployeeCard';
import { useFetchEmployees } from '../../../employees/application/useGetEmployees';

export const TeamSection: React.FC<{
  specificContentModule: TeamSectionModule;
}> = ({ specificContentModule }) => {
  const employees = useFetchEmployees();
  const fallbackIndex = 99;
  const ordered = employees?.sort((a, b) =>
    (a.listOrderIndex != null ? a.listOrderIndex : fallbackIndex) <
    (b.listOrderIndex != null ? b.listOrderIndex : fallbackIndex)
      ? -1
      : 1,
  );

  return (
    <SectionContainer py="md">
      <Box width={{ base: '100%', lg: '50%' }}>
        <TitleWithSubtitleAndDescription {...specificContentModule} />
      </Box>
      <SimpleGrid mt={4} columns={{ base: 1, md: 2, lg: 3 }} spacing={3}>
        {ordered
          ?.filter((e) => !e.hasLeftTheTeam && !e.isInLeadershipTeam)
          ?.map((p, index) => (
            <EmployeeCard
              linkText={specificContentModule.linkText}
              employee={p}
              key={index}
            />
          ))}
      </SimpleGrid>
    </SectionContainer>
  );
};

export default TeamSection;
