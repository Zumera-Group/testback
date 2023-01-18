import React from 'react';

import { ContactUsSectionModule } from '../../domain/contentModule';

import ContactUs from 'components/ContactUs';

export const ContactUsSection: React.FC<{
  specificContentModule: ContactUsSectionModule;
  content?: any;
  siteSettings: any;
}> = ({ specificContentModule, siteSettings, content }) => {
  const contentModule = specificContentModule ? specificContentModule : content;
  if (!specificContentModule && !content) return null;
  return <ContactUs {...contentModule} siteSettings={siteSettings} />;
};

export default ContactUsSection;
