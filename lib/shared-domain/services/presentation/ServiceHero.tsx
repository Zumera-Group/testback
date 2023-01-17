import React from 'react';

import { ServiceHero as SHero } from 'components/Service';
import { Service } from 'lib/shared-domain/page/domain';

export const ServiceHero: React.FC<{ service: Service }> = ({ service }) => {
  return <SHero service={service} />;
};
