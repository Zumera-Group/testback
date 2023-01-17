import React from 'react';

import { Tab } from 'lib/shared-domain/page/domain';
import { ServiceTabs as STabs } from 'components/Service/ServiceTabs';

interface ServiceTabsProps {
  tabs: Tab[];
  onSelectTab(t: Tab): void;
  activeTabKey: string;
}

export const ServiceTabs: React.FC<ServiceTabsProps> = (props) => {
  return <STabs {...props} />;
};

export default ServiceTabs;
