import React from 'react';

import { ContactUsSectionModule } from '../../domain/contentModule';

import ContactUs from 'components/ContactUs';

export const ContactUsSection: React.FC<{
  specificContentModule: ContactUsSectionModule;
  content?: any;
}> = ({ specificContentModule, content }) => {
  const contentModule = specificContentModule ? specificContentModule : content;
  if (!specificContentModule && !content) return null;
  return <ContactUs {...contentModule} />;
};

export default ContactUsSection;
