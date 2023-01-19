import React from 'react';
import { GlobalNetworkSection as GlobalNetworkSectionComponent } from 'components/GlobalNetworkSection';
import { GlobalNetworkSectionModule } from 'lib/shared-domain/page/domain/contentModule';

export const GlobalNetworkSection: React.FC<{
  specificContentModule: GlobalNetworkSectionModule;
}> = ({ specificContentModule }) => {
  return <GlobalNetworkSectionComponent {...specificContentModule} />;
};

export default GlobalNetworkSection;
