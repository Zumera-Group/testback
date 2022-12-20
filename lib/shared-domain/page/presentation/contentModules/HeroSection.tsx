import React from 'react';

import { HeroSectionModule } from '../../domain/contentModule';

import Hero from 'components/Hero';

export const HeroSection: React.FC<{
  specificContentModule: HeroSectionModule;
}> = ({ specificContentModule }) => {
  return (
    <Hero {...specificContentModule} />
  );
};

export default HeroSection;
