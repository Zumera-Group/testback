import {
  AboutUsSectionModule,
  ContactUsSectionModule,
  ContentModule,
  DividerImageModule,
  HeroSectionModule,
  ServicesLargeGridSectionModule,
  TransactionShowcaseSectionModule,
  TrustSectionModule,
  NewsGridSectionModule,
  TimelineSectionModule,
  TransactionsCarouselSectionModule,
  SectorsSectionModule,
  CDIGlobalSectionModule,
  FactsAndFiguresSectionModule,
  TitleAndDescriptionItemsGridModule,
  CalculatorTeaserSectionModule,
  TransactionGridSectionModule,
  SectorHeaderSectionModule,
  AllTransactionsCarouselSectionModule,
  OpenJobsListModule,
  CenteredTitleWithSubtitleSectionModule,
  HeadlineWithBackgroundSectionModule,
  ImageSliderSectionModule,
  IconRowSectionModule,
  TabSectionModule,
  JobListWithBgSectionModule,
  TextSliderSectionModule,
  EmployeeCarouselSectionModule,
  PartnerHeroModule,
  PartnerStrategyModule,
  PartnerAboutModule,
  PartnerLogosAndTextsModule,
  PartnerAboutWithImageModule,
  PartnerPersonQuoteModule,
  PartnerVisionModule,
  LandingPageEnterSurveySectionModule,
  LandingPageTrackRecordModule,
  LandingRoadmapModule,
  LandingPageOurPromiseSectionModule,
  BrandOverviewSectionModule,
  ReferralSectionModule,
} from '../../domain/contentModule';

import {
  GlobalNetworkSectionModule,
  FactsAndNumbersCDISectionModule,
} from '../../domain/contentModule';
import {
  TextElementSectionModule,
  AboutTheToolSectionModule,
} from '../../domain/contentModule';
import {
  HowCoolSectionModule,
  LogosWithHeadlineSectionModule,
} from '../../domain/contentModule';
import {
  LegalNoticeSectionModule,
  DisclaimerSectionModule,
} from '../../domain/contentModule';
import {
  LeadershipTeamSectionModule,
  TeamSectionModule,
} from '../../domain/contentModule';
import React from 'react';
import HeroSection from './HeroSection';
import AboutTheToolSection from './AboutTheToolSection';
import AboutUsSection from './AboutUsSection';
import AllTransactionsCarouselSection from './AllTransactionsCarouselSection';
import CalculatorTeaserSection from './CalculatorTeaserSection';
import CDIGlobalSection from './CDIGlobalSection';
import ContactUsSection from './ContactUsSection';
import DisclaimerSection from './DisclaimerSection';
import DividerImage from './DividerImage';
import FactsAndFiguresSection from './FactsAndFiguresSection';
import FactsAndNumbersCDISection from './FactsAndNumbersCDISection';
import GlobalNetworkSection from './GlobalNetworkSection';
import HowCoolSection from './HowCoolSection';
import LeadershipTeamSection from './LeadershipTeamSection';
import LegalNoticeSection from './LegalNoticeSection';
import LogosWithHeadlineSection from './LogosWithHeadlineSection';
import NewsGridSection from './NewsGridSection';
import OpenJobsList from './OpenJobsList';
import SectorHeaderSection from './SectorHeaderSection';
import SectorsSection from './SectorsSection';
import ServicesLargeGridSection from './ServicesLargeGridSection';
import TeamSection from './TeamSection';
import TextElementSection from './TextElementSection';
import TimelineSection from './TimelineSection';
import TitleAndDescriptionItemsGrid from './TitleAndDescriptionItemsGrid';
import TransactionGridSection from 'lib/shared-domain/page/presentation/contentModules/TransactionGridSection';
import TransactionsCarouselSection from './TransactionsCarouselSection';
import TransactionShowcaseSection from './TransactionShowcaseSection';
import TrustSection from './TrustSection';
import CenteredTitleWithSubtitleSection from './CenteredTitleWithSubtitleSection';
import HeadlineWithBackgroundSection from './HeadlineWithBackgroundSection';
import ImageSliderSection from './ImageSliderSection';
import IconRowSection from './IconRowSection';
import TabSection from './TabSection';
import JobListWithBgSection from './JobListWithBgSection';
import TextSliderSection from './TextSliderSection';
import EmployeeCarouselSection from './EmployeeCarouselSection';
import {
  IndustryReportSectionModule,
  TitleTextAndImageSectionModule,
  ValuationBenefitsSectionModule,
} from '../../domain/contentModule';
import { IndustryReportSection } from './IndustryReportSection';
import { PartnersHero } from '../../../partners/presentation/components/PartnersHero';
import { PartnerStrategic } from '../../../partners/presentation/components/PartnersStrategic';
import { PartnerAbout } from '../../../partners/presentation/components/PartnersAbout';
import { PartnersLogosAndTextsSection } from '../../../partners/presentation/components/PartnersLogosAndTextsSection';
import { PartnersAboutWithImage } from '../../../partners/presentation/components/PartnersAboutWithImage';
import { PartnersPersonQuote } from '../../../partners/presentation/components/PartnersPersonQuote';
import { PartnersVision } from '../../../partners/presentation/components/PartnersVision';

import { LandingPageEnterSurveySection } from '../../../partners/presentation/components/LandingPageEnterSurveySectionModule';

import TitleTextAndImageSection from './TitleTextAndImageSection';
import ValuationBenefitsSection from './ValuationBenefitsSection';
import { LandingPageTrackRecord } from './LandingPageTrackRecord';
import { LandingRoadmap } from './LandingRoadmap';
import { LandingPageOurPromiseSection } from './LandingPageOurPromiseSection';
import { BrandOverviewSection } from 'lib/shared-domain/valuation-tool/presentation/BrandOverviewSection';
import { ReferralSection } from 'lib/shared-domain/valuation-tool/presentation/ReferralSection';

export const getContentForContentModule = (
  contentModule: ContentModule,
  sharedContent?: any,
): JSX.Element => {
  if (
    contentModule.specificContentModule instanceof EmployeeCarouselSectionModule
  ) {
    return (
      <EmployeeCarouselSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }
  if (contentModule.specificContentModule instanceof TextSliderSectionModule) {
    return (
      <TextSliderSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }
  if (
    contentModule.specificContentModule instanceof JobListWithBgSectionModule
  ) {
    return (
      <JobListWithBgSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }
  if (contentModule.specificContentModule instanceof TabSectionModule) {
    return (
      <TabSection specificContentModule={contentModule.specificContentModule} />
    );
  }
  if (contentModule.specificContentModule instanceof IconRowSectionModule) {
    return (
      <IconRowSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }
  if (
    contentModule.specificContentModule instanceof
    CenteredTitleWithSubtitleSectionModule
  ) {
    return (
      <CenteredTitleWithSubtitleSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }
  if (
    contentModule.specificContentModule instanceof
    CenteredTitleWithSubtitleSectionModule
  ) {
    return (
      <CenteredTitleWithSubtitleSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (contentModule.specificContentModule instanceof ImageSliderSectionModule) {
    return (
      <ImageSliderSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (
    contentModule.specificContentModule instanceof
    HeadlineWithBackgroundSectionModule
  ) {
    return (
      <HeadlineWithBackgroundSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (contentModule.specificContentModule instanceof HeroSectionModule) {
    return (
      <HeroSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (contentModule.specificContentModule instanceof DividerImageModule) {
    return (
      <DividerImage
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (contentModule.specificContentModule instanceof AboutUsSectionModule) {
    return (
      <AboutUsSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (contentModule.specificContentModule instanceof ContactUsSectionModule) {
    return (
      <ContactUsSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }
  if (
    contentModule.specificContentModule instanceof
    ServicesLargeGridSectionModule
  ) {
    return (
      <ServicesLargeGridSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (
    contentModule.specificContentModule instanceof
    TransactionShowcaseSectionModule
  ) {
    return (
      <TransactionShowcaseSection
        sharedContent={sharedContent}
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (contentModule.specificContentModule instanceof TrustSectionModule) {
    return (
      <TrustSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (contentModule.specificContentModule instanceof NewsGridSectionModule) {
    return (
      <NewsGridSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (contentModule.specificContentModule instanceof TimelineSectionModule) {
    return (
      <TimelineSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (contentModule.specificContentModule instanceof SectorsSectionModule) {
    return (
      <SectorsSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (
    contentModule.specificContentModule instanceof FactsAndFiguresSectionModule
  ) {
    return (
      <FactsAndFiguresSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (
    contentModule.specificContentModule instanceof
    TransactionsCarouselSectionModule
  ) {
    return (
      <TransactionsCarouselSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (
    contentModule.specificContentModule instanceof
    AllTransactionsCarouselSectionModule
  ) {
    return (
      <AllTransactionsCarouselSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (contentModule.specificContentModule instanceof CDIGlobalSectionModule) {
    return (
      <CDIGlobalSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (
    contentModule.specificContentModule instanceof CalculatorTeaserSectionModule
  ) {
    return (
      <CalculatorTeaserSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (
    contentModule.specificContentModule instanceof TransactionGridSectionModule
  ) {
    return (
      <TransactionGridSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (
    contentModule.specificContentModule instanceof GlobalNetworkSectionModule
  ) {
    return (
      <GlobalNetworkSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (
    contentModule.specificContentModule instanceof
    FactsAndNumbersCDISectionModule
  ) {
    return (
      <FactsAndNumbersCDISection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (contentModule.specificContentModule instanceof TextElementSectionModule) {
    return (
      <TextElementSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (
    contentModule.specificContentModule instanceof LeadershipTeamSectionModule
  ) {
    return (
      <LeadershipTeamSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (contentModule.specificContentModule instanceof TeamSectionModule) {
    return (
      <TeamSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (
    contentModule.specificContentModule instanceof SectorHeaderSectionModule
  ) {
    return (
      <SectorHeaderSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (
    contentModule.specificContentModule instanceof AboutTheToolSectionModule
  ) {
    return (
      <AboutTheToolSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (contentModule.specificContentModule instanceof HowCoolSectionModule) {
    return (
      <HowCoolSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (
    contentModule.specificContentModule instanceof
    LogosWithHeadlineSectionModule
  ) {
    return (
      <LogosWithHeadlineSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (
    contentModule.specificContentModule instanceof
    TitleAndDescriptionItemsGridModule
  ) {
    return (
      <TitleAndDescriptionItemsGrid
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (contentModule.specificContentModule instanceof OpenJobsListModule) {
    return (
      <OpenJobsList
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (contentModule.specificContentModule instanceof LegalNoticeSectionModule) {
    return (
      <LegalNoticeSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (contentModule.specificContentModule instanceof DisclaimerSectionModule) {
    return (
      <DisclaimerSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }
  if (
    contentModule.specificContentModule instanceof IndustryReportSectionModule
  ) {
    return (
      <IndustryReportSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (contentModule.specificContentModule instanceof PartnerHeroModule) {
    return (
      <PartnersHero
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (contentModule.specificContentModule instanceof PartnerStrategyModule) {
    return (
      <PartnerStrategic
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (contentModule.specificContentModule instanceof PartnerAboutModule) {
    return (
      <PartnerAbout
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (
    contentModule.specificContentModule instanceof PartnerLogosAndTextsModule
  ) {
    return (
      <PartnersLogosAndTextsSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (
    contentModule.specificContentModule instanceof PartnerAboutWithImageModule
  ) {
    return (
      <PartnersAboutWithImage
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (contentModule.specificContentModule instanceof PartnerPersonQuoteModule) {
    return (
      <PartnersPersonQuote
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (contentModule.specificContentModule instanceof PartnerVisionModule) {
    return (
      <PartnersVision
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (
    contentModule.specificContentModule instanceof
    TitleTextAndImageSectionModule
  ) {
    return (
      <TitleTextAndImageSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (
    contentModule.specificContentModule instanceof
    LandingPageEnterSurveySectionModule
  ) {
    return (
      <LandingPageEnterSurveySection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (
    contentModule.specificContentModule instanceof
    LandingPageOurPromiseSectionModule
  ) {
    return (
      <LandingPageOurPromiseSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (
    contentModule.specificContentModule instanceof
    ValuationBenefitsSectionModule
  ) {
    return (
      <ValuationBenefitsSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (
    contentModule.specificContentModule instanceof
    ValuationBenefitsSectionModule
  ) {
    return (
      <ValuationBenefitsSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (
    contentModule.specificContentModule instanceof LandingPageTrackRecordModule
  ) {
    return (
      <LandingPageTrackRecord
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (contentModule.specificContentModule instanceof LandingRoadmapModule) {
    return (
      <LandingRoadmap
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }

  if (
    contentModule.specificContentModule instanceof BrandOverviewSectionModule
  ) {
    return (
      <BrandOverviewSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }
  if (contentModule.specificContentModule instanceof ReferralSectionModule) {
    return (
      <ReferralSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }
};
