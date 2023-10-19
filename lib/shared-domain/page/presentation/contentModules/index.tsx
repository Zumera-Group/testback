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
  SectorsSectionModule,
  CDIGlobalSectionModule,
  FactsAndFiguresSectionModule,
  TransactionGridSectionModule,
  AllTransactionsCarouselSectionModule,
  AnchoredTextSectionModule,
  FiveStepsSectionModule,
  TextWithImageGridModule,
  ApproachListSectionModule,
  AccordionSectionModule,
  TitleTextSectionModule,
  ImagesGridSectionModule,
  VTHeroModule,
  VTValuesGridSectionModule,
  VTServicesSectionModule,
  StepsDownBulletsSectionModule,
  StickyFooterModule,
  TransactionQuoteModule,
  OpenJobsListModule,
  PartnerLogosAndTextsModule,
  DividerLineModule,
  PartnerPersonQuoteModule,
  PartnerReviewModule,
  PartnerVisionModule,
  WhitePaperDownloadModule,
  LogoBarSectionModule,
  TransactionsCarouselSectionModule,
} from '../../domain/contentModule';

import {
  GlobalNetworkSectionModule,
  FactsAndNumbersCDISectionModule,
} from '../../domain/contentModule';
import { TextElementSectionModule } from '../../domain/contentModule';
import {
  LeadershipTeamSectionModule,
  TeamSectionModule,
} from '../../domain/contentModule';
import React from 'react';
import HeroSection from './HeroSection';
import AboutUsSection from './AboutUsSection';
import AllTransactionsCarouselSection from './AllTransactionsCarouselSection';
import CDIGlobalSection from './CDIGlobalSection';
import ContactUsSection from './ContactUsSection';
import DividerImage from './DividerImage';
import FactsAndFiguresSection from './FactsAndFiguresSection';
import FactsAndNumbersCDISection from './FactsAndNumbersCDISection';
import GlobalNetworkSection from './GlobalNetworkSection';
import LeadershipTeamSection from './LeadershipTeamSection';
import SectorsSection from './SectorsSection';
import ServicesLargeGridSection from './ServicesLargeGridSection';
import TeamSection from './TeamSection';
import TextElementSection from './TextElementSection';
import TimelineSection from './TimelineSection';
import TransactionGridSection from 'lib/shared-domain/page/presentation/contentModules/TransactionGridSection';
import TransactionShowcaseSection from './TransactionShowcaseSection';
import TrustSection from './TrustSection';
import { AnchoredTextSection } from 'components/AnchoredTextSection/AnchoredTextSection';
import { FiveSteps } from 'components/FiveSteps';
import { TextWithImageGrid } from 'components/TextWithImageGrid';
import { ApproachListSection } from 'components/ApproachListSection';
import { AccordionSection } from 'components/Accordion/AccordionSection';
import TitleTextSection from 'components/TitleTextSection';
import { ImagesGridSection } from 'components/ImagesGridSection';
import VTHero from 'components/VTHero';
import { VTValuesGridSection } from 'components/VTValuesGridSection';
import { VTServicesSection } from 'components/VTServicesSection/VTServicesSection';
import { StepsDownBulletsSection } from 'components/StepsDownBulletsSection';
import { StickyFooter } from 'components/StickyFooter';
import { TransactionQuote } from 'components/TransactionQuote';
import { WhitePaperDownload } from 'components/WhitePaperDownload';

import dynamic from 'next/dynamic';
import { OpenJobsList } from 'components/OpenJobsList';
import { PartnerLogoAndTextSection } from 'components/PartnerLogoAndTextSection';
import { DividerLine } from 'components/DividerLine';
import { PartnerPersonQuote } from 'components/PartnerPersonQuote';
import { PartnerReviewSection } from 'components/PartnerReviewSection';
import { PartnerVisionSection } from 'components/PartnerVisionSection';
import InfoSection from 'components/Sector/SectorInfo/InfoSection';
import GrowthRatesSection from 'components/Sector/SectorInfo/GrowthRatesSection';
import { SectorHero, SectorTeam, SectorTransactions } from 'components/Sector';
import FutureTrendsSection from 'components/Sector/SectorInfo/FutureTrendsSection';
import SectorMoreDetails from 'components/SectorMoreDetails/SectorMoreDetails';
import { WhitePaperDownloadSection } from 'components/WhitePaperDownload/WhitePaperDownloadSection';
import { LogoBarSection } from 'components/LogoBarSection';

const NewsGridSection = dynamic(() => import('./NewsGridSection'), {
  ssr: false,
});
export const getContentForContentModule = (
  contentModule: ContentModule | any,
  siteSettings: any,
  sharedContent?: any,
  allModulesData?: any,
): JSX.Element => {
  if (contentModule.specificContentModule?._type === 'moreDetailsSection') {
    return (
      <SectorMoreDetails
        moreDetailsDescription={
          contentModule.specificContentModule.moreDetailsDescription
        }
        sectorMoreDetailsPicture={
          contentModule.specificContentModule.sectorMoreDetailsPicture
        }
        title={contentModule.specificContentModule.title}
      />
    );
  }
  if (contentModule.specificContentModule?._type === 'futureTrendsSection') {
    return (
      <FutureTrendsSection
        futureTrends={{
          title: contentModule.specificContentModule.title,
          trendDescription:
            contentModule.specificContentModule.trendDescription,
          trendsImage: contentModule.specificContentModule.trendsImage,
        }}
      />
    );
  }
  if (contentModule.specificContentModule?._type === 'sectorHeroSection') {
    const {
      contributors,
      name,
      date,
      type,
      detailPageHeroImage,
      contributorsTitle,
      typeTitle,
      dateTitle,
    } = contentModule.specificContentModule;

    return (
      <SectorHero
        content={{
          contributors: contributorsTitle,
          type: typeTitle,
          lateUpdate: dateTitle,
        }}
        sector={{
          contributors,
          name,
          date,
          type,
          detailPageHeroImage,
        }}
      />
    );
  }
  if (contentModule.specificContentModule?._type === 'teamWithQuoteSection') {
    return (
      <SectorTeam
        hideLink
        sector={{
          teamSection: {
            title: contentModule.specificContentModule.title,
            description: contentModule.specificContentModule.description,
            author: contentModule.specificContentModule.author,
            quote: contentModule.specificContentModule.quoteText,
            linkText: contentModule.specificContentModule.linkText,
          },
          contributors: [
            {
              newsGridPicture: {
                picture:
                  contentModule.specificContentModule.author.detailPagePicture,
              },
              jobTitle: contentModule.specificContentModule.author.jobTitle,
              firstName: contentModule.specificContentModule.author.firstName,
              lastName: contentModule.specificContentModule.author.lastName,
            },
          ],
        }}
      />
    );
  }
  if (contentModule.specificContentModule?._type === 'growthRateSection') {
    return (
      <GrowthRatesSection
        growthRatesTable={contentModule.specificContentModule.growthRatesTable}
        transactionsTable={
          contentModule.specificContentModule.transactionsTable
        }
        trendsTable={contentModule.specificContentModule.trendsTable}
      />
    );
  }
  if (contentModule.specificContentModule?._type === 'infoSection') {
    return (
      <InfoSection
        title={contentModule.specificContentModule.title}
        subtitle={contentModule.specificContentModule.subtitle}
        description={contentModule.specificContentModule.subtitle}
        accordionQuestionAndAnswers={
          contentModule.specificContentModule.accordionQuestionAndAnswers || []
        }
      />
    );
  }
  if (contentModule.specificContentModule instanceof LogoBarSectionModule) {
    return <LogoBarSection />;
  }

  if (contentModule.specificContentModule instanceof PartnerVisionModule) {
    return (
      <PartnerVisionSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }
  if (contentModule.specificContentModule instanceof PartnerReviewModule) {
    return (
      <PartnerReviewSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }
  if (contentModule.specificContentModule instanceof PartnerPersonQuoteModule) {
    return (
      <PartnerPersonQuote
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }
  if (contentModule.specificContentModule instanceof DividerLineModule) {
    return <DividerLine />;
  }
  if (
    contentModule.specificContentModule instanceof PartnerLogosAndTextsModule
  ) {
    return (
      <PartnerLogoAndTextSection
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
  if (contentModule.specificContentModule instanceof WhitePaperDownloadModule) {
    return (
      <WhitePaperDownloadSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }
  if (contentModule.specificContentModule instanceof TransactionQuoteModule) {
    return (
      <TransactionQuote
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }
  if (contentModule.specificContentModule instanceof StickyFooterModule) {
    return (
      <StickyFooter
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }
  if (
    contentModule.specificContentModule instanceof StepsDownBulletsSectionModule
  ) {
    return (
      <StepsDownBulletsSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }
  if (contentModule.specificContentModule instanceof VTServicesSectionModule) {
    return (
      <VTServicesSection
        specificContentModule={contentModule.specificContentModule}
        siteSettings={siteSettings}
      />
    );
  }
  if (
    contentModule.specificContentModule instanceof VTValuesGridSectionModule
  ) {
    return (
      <VTValuesGridSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }
  if (contentModule.specificContentModule instanceof VTHeroModule) {
    return (
      <VTHero specificContentModule={contentModule.specificContentModule} />
    );
  }
  if (contentModule.specificContentModule instanceof ImagesGridSectionModule) {
    return (
      <ImagesGridSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }
  if (contentModule.specificContentModule instanceof TitleTextSectionModule) {
    return (
      <TitleTextSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }
  if (contentModule.specificContentModule instanceof AccordionSectionModule) {
    return (
      <AccordionSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }
  if (
    contentModule.specificContentModule instanceof ApproachListSectionModule
  ) {
    return (
      <ApproachListSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }
  if (contentModule.specificContentModule instanceof TextWithImageGridModule) {
    return (
      <TextWithImageGrid
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }
  if (contentModule.specificContentModule instanceof FiveStepsSectionModule) {
    return (
      <FiveSteps specificContentModule={contentModule.specificContentModule} />
    );
  }
  if (
    contentModule.specificContentModule instanceof AnchoredTextSectionModule
  ) {
    return (
      <AnchoredTextSection
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }
  if (contentModule.specificContentModule instanceof HeroSectionModule) {
    return (
      <HeroSection
        specificContentModule={contentModule.specificContentModule}
        allPageContent={allModulesData}
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
        specificContentModule={null}
        content={siteSettings.contactSectionContent}
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
      // @ts-ignore
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
  if (contentModule.specificContentModule === 'blogIndexSection') {
    return <div>Blog</div>;
  }
};
