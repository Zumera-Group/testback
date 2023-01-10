import { Box } from 'components/Layout/Flex/Flex';
import React from 'react';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';
import { LeadershipTeamSectionModule } from '../../domain/contentModule';
import { TitleWithSubtitleAndDescription } from '../components/TitleWithSubtitleAndDescription';

import { SectionContainer } from 'components/Layout/SectionContainer';
import { Employee } from '../../../employees/domain/index';
import { Grid, GridItem } from '@chakra-ui/react';
import { EmployeeCard } from 'lib/shared-domain/employees/presentation/EmployeeCard';
import { useFetchEmployees } from 'lib/shared-domain/employees/application/useGetEmployees';

const fallbackIndex = 999;

export const LeadershipTeamSection: React.FC<{
  specificContentModule: LeadershipTeamSectionModule;
}> = ({ specificContentModule }) => {
  const employees = useFetchEmployees();
  // const isMobile = useBreakpointValue({ base: true, md: false });
  const isMobile = false;
  const leadershipTeamMembers =
    employees?.filter(
      (e) =>
        !e.hasLeftTheTeam &&
        !!e.isInLeadershipTeam &&
        e.leadershipListIndex !== 0,
    ) || [];

  const bigLeadershipTeamMembers =
    employees?.filter(
      (e) =>
        !e.hasLeftTheTeam &&
        !!e.isInLeadershipTeam &&
        e.leadershipListIndex === 0,
    ) || [];

  const orderedLeadershipTeamMembers = leadershipTeamMembers.sort((a, b) =>
    (a.leadershipListIndex != null ? a.leadershipListIndex : fallbackIndex) <
    (b.leadershipListIndex != null ? b.leadershipListIndex : fallbackIndex)
      ? -1
      : 1,
  );

  return (
    <SectionContainer py="md">
      <Box mb={4} width={{ base: '100%', lg: '50%' }}>
        <TitleWithSubtitleAndDescription {...specificContentModule} />
      </Box>
      <Grid
        templateColumns={{
          base: '1fr',
          lg: '1fr 1fr 1fr 1fr 1fr 1fr',
        }}
        gap={3}
      >
        {[...bigLeadershipTeamMembers, ...orderedLeadershipTeamMembers]?.map(
          (p, index) => {
            const getColspan = () => {
              if (isMobile) return 1;
              if (index === 0) return 4;
              return 2;
            };
            return (
              <GridItem colSpan={getColspan()} key={index}>
                <EmployeeCard
                  linkText={specificContentModule.linkText}
                  employee={p}
                />
              </GridItem>
            );
          },
        )}
      </Grid>
    </SectionContainer>
  );
};

export default LeadershipTeamSection;
