import React from 'react';
import { ContactUsSection } from '../../page/presentation/contentModules/ContactUsSection';

export const EmployeeContact: React.FC<{ content: any }> = ({ content }) => {
  return <ContactUsSection specificContentModule={null} content={content} />;
};
