import React from 'react';

import { SiteSettings } from '../domain/index';

import Footer from 'components/Footer';

export const PageFooter: React.FC<{
  siteSettings: SiteSettings;
}> = ({ siteSettings }) => {
  return <Footer {...siteSettings} />;
};

export default PageFooter;
