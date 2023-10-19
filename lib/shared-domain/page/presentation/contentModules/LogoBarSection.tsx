import React from 'react';

import { LogoBarSectionModule } from '../../domain/contentModule';

import LogoBarSection from 'components/LogoBarSection';

export const LogoBarSection: React.FC<{
  specificContentModule: LogoBarSectionModule;
}> = ({ specificContentModule }) => {
  return <LogoBarSection {...specificContentModule} />;
};

export default LogoBarSection;
