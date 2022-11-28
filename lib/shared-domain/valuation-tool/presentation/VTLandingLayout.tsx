import React from 'react';
import { SiteSettings } from '../../page/domain/index';
import { VTLanding } from '../domain/index';
import { Box } from '../../../../components/Layout/Flex/Flex';
import { SEO } from '../../../../components/SEO';
import { PageTransition } from 'components/PageTransition';
import { VTLandingHeader } from './VTLandingHeader';
import { VTLandingHero } from './VTLandingHero';
import { ContentModule } from '../../page/domain/contentModule';
import { getContentForContentModule } from '../../page/presentation/contentModules/index';
import { VTLandingFooter } from './VTLandingFooter';

export const VTLandingLayout: React.FC<{
  siteSettings: SiteSettings;
  landing: VTLanding;
}> = ({ siteSettings, landing }) => {
  const contentModules =
    landing?.contentModules?.map((c) => ContentModule.create(c)) || [];

  return (
    <Box minHeight="100vh" overflowX="hidden">
      <SEO
        seoTitle={landing?.landingName}
        seoDescription={landing?.seoDescription}
        seoImage={landing?.seoImage}
        siteSettings={siteSettings}
      />
      <VTLandingHeader
        siteSettings={siteSettings}
        contentModules={contentModules}
        landing={landing}
      />
      <PageTransition slug={landing?.landingSlug?.current}>
        {landing.questionnaire && <VTLandingHero landing={landing} />}
        {contentModules &&
          contentModules.map((c) => (
            <Box key={c._key}>{getContentForContentModule(c)}</Box>
          ))}
      </PageTransition>
      <VTLandingFooter siteSettings={siteSettings} />
    </Box>
  );
};
