import React from 'react';

import { AboutUsSectionModule } from '../../domain/contentModule';

import AboutUs from 'components/AboutUs';

export const AboutUsSection: React.FC<{
  specificContentModule: AboutUsSectionModule;
}> = ({ specificContentModule }) => {
  return (
    <AboutUs {...specificContentModule} />
  );
};

export default AboutUsSection;
