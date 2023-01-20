import React from 'react';

import { HeroSectionModule } from '../../domain/contentModule';

import Hero from 'components/Hero';

export const HeroSection: React.FC<{
  specificContentModule: HeroSectionModule;
  allPageContent: any[];
}> = ({ specificContentModule, allPageContent }) => {
  return <Hero allPageContent={allPageContent} {...specificContentModule} />;
};

export default HeroSection;
