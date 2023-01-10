import React from 'react';

import { TeamSectionModule } from '../../domain/contentModule';

import Team from 'components/Team';

export const TeamSection: React.FC<{
  specificContentModule: TeamSectionModule;
}> = ({ specificContentModule }) => {
  return (
    <Team {...specificContentModule} />
  );
};

export default TeamSection;
