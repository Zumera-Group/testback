import { fonts, fontSizes } from 'styles/foundations/fontStyles';
import { fontWeights } from '../foundations/fontStyles';

export const HeadingStyles = {
  variants: {
    h1: {
      fontSize: fontSizes.h1,
      fontWeight: fontWeights.regular,
      lineHeight: '39px',
    },
    contactFormH: {
      fontSize: fontSizes.contactFormH,
      fontWeight: fontWeights.regular,
      lineHeight: '40px',
      fontFamily: fonts.condor,
    },
    mobileContactFormH: {
      fontSize: fontSizes.mobileContactFormH,
      fontWeight: fontWeights.regular,
      lineHeight: '40px',
      fontFamily: fonts.condor,
    },
    websiteH1: {
      fontSize: fontSizes.websiteH1,
      fontWeight: fontWeights.regular,
      lineHeight: '60px',
      fontFamily: fonts.condor,
    },
    mobileWebsiteH1: {
      fontSize: fontSizes.mobileWebsiteH1,
      fontWeight: fontWeights.regular,
      lineHeight: '48px',
      fontFamily: fonts.condor,
    },
    websiteTrustSectionH: {
      fontSize: fontSizes.websiteTrustSectionH,
      fontWeight: fontWeights.regular,
      lineHeight: '58px',
    },
    websiteTimelineSectionH: {
      fontSize: fontSizes.websiteH1,
      fontWeight: fontWeights.regular,
      lineHeight: '60px',
    },
    mobileWebsiteTrustSectionH: {
      fontSize: fontSizes.mobileWebsiteTrustSectionH,
      fontWeight: fontWeights.regular,
      lineHeight: '58px',
    },
    factsAndFiguresSectionH: {
      fontSize: fontSizes.websiteH1,
      fontWeight: fontWeights.highlight,
      lineHeight: '55px',
    },
    mobileFactsAndFiguresSectionH: {
      fontSize: fontSizes.mobileWebsiteH1,
      fontWeight: fontWeights.highlight,
      lineHeight: '32px',
    },
    h2: {
      fontSize: fontSizes.h2,
      fontWeight: 'bold',
    },
    desktopGlobalNetworkSectionH: {
      fontSize: fontSizes.mobileTransactionSectionTitle,
      fontWeight: fontWeights.regular,
      fontFamily: fonts.condor,
    },
    h404: {
      fontSize: fontSizes.websiteH1,
      fontWeight: fontWeights.regular,
      fontFamily: fonts.condor,
    },
  },
};
