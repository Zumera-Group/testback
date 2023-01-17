import React from 'react';

import { ServiceHelpContactPersonSection } from 'components/Service/ServiceHelpContactPersonSection';
import { ServiceHelpContactSection } from 'lib/shared-domain/page/domain';

export const ServiceHelpContactPerson: React.FC<{
  helpContactPerson: ServiceHelpContactSection;
}> = ({ helpContactPerson }) => {
  return (
    <ServiceHelpContactPersonSection helpContactPerson={helpContactPerson} />
  );
};
