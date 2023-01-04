import React from 'react';

import { LeadershipTeamSectionModule } from '../../domain/contentModule';

import LeadershipTeam from 'components/LeadershipTeam';

export const LeadershipTeamSection: React.FC<{
  specificContentModule: LeadershipTeamSectionModule;
}> = ({ specificContentModule }) => {
  return (
    <LeadershipTeam {...specificContentModule} />
  );
};

export default LeadershipTeamSection;
