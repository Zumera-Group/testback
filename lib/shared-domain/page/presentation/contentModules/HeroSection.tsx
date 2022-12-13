import React from 'react';

import { HeroSectionModule } from '../../domain/contentModule';

import Hero from 'components/Hero';

export const HeroSection: React.FC<{
  specificContentModule: HeroSectionModule;
}> = ({ specificContentModule }) => {

  const isJobLanding = specificContentModule.type === 'job-landing';
  const isHome = specificContentModule.type === 'home';
  const isLevel2 = specificContentModule.type === 'level2';
  const isLevel1 = specificContentModule.type === 'level1';
  const isTransaction = specificContentModule.type === 'transaction';
  const isAboutUs = specificContentModule.type === 'about-us';
  const isCareer = specificContentModule.type === 'career';
  const isNews = specificContentModule.type === 'news';
  const isTermsAndConditions =
    specificContentModule.type === 'termsAndConditions';

  return (
    <div>
      {isHome && (
        <Hero {...specificContentModule} />
      )}
    </div>
  );
};

export default HeroSection;
