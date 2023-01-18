import React from 'react';
import { ContactUsSection } from '../../page/presentation/contentModules/ContactUsSection';
import { ContactUsSectionModule } from 'lib/shared-domain/page/domain/contentModule';

export const EmployeeContact: React.FC<ContactUsSectionModule> = (props) => {
  return <ContactUsSection specificContentModule={null} content={props} />;
};
