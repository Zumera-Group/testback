import React from 'react';

import { ServiceProcess as SProcess } from 'components/Service/ServiceProcess';
import { ServiceProcessData } from 'lib/shared-domain/page/domain';

export const ServiceProcess: React.FC<{
  process: ServiceProcessData | any;
}> = ({ process }) => {
  return <SProcess process={process} />;
};
