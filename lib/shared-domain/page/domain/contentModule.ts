import { Transaction } from 'lib/shared-domain/transactions/domain';
import { Fact, TitleAndDescriptionItem } from '.';
import { Sector, Service, Description, IndustryReport } from './index';
import { Office } from 'lib/shared-domain/offices/domain/index';
import { Employee } from 'lib/shared-domain/employees/domain';

export abstract class BaseModule {}

export class TitleTextAndImageSectionModule extends BaseModule {
  title: string;
  description: any[];
  image: {
    asset: {
      url: string;
    };
  };

  constructor(fields: Record<string, any>) {
    super();

    this.title = fields.title;
    this.description = fields.description;
    this.image = fields.image;
  }
}

export class ValuationBenefitsSectionModule extends BaseModule {
  title: string;
  description: any[];
  buttonText: string;
  questionnaire: {
    questionnaireSlug: {
      current: string;
    };
  };
  iconRows: {
    title: string;
    description: any[];
    icon: {
      iconImage: {
        asset: {
          url: string;
        };
      };
    };
  }[];

  get questionnaireSlug(): string {
    return this.questionnaire?.questionnaireSlug?.current;
  }

  constructor(fields: Record<string, any>) {
    super();

    this.title = fields.title;
    this.description = fields.description;
    this.buttonText = fields.buttonText;
    this.questionnaire = fields.questionnaire;
    this.iconRows = fields.iconRows;
  }
}

export class IndustryReportSectionModule extends BaseModule {
  industryReport: IndustryReport;

  constructor(fields: Record<string, any>) {
    super();

    this.industryReport = fields.industryReport;
  }
}

export class DisclaimerSectionModule extends BaseModule {
  title: string;
  textBlocks: any[];

  constructor(fields: Record<string, any>) {
    super();

    this.title = fields.title;
    this.textBlocks = fields.textBlocks;
  }
}

export class LegalNoticeSectionModule extends BaseModule {
  subtitle: string;
  title: string;
  textBlocks: any[];
  hasBorderBottom: boolean;

  constructor(fields: Record<string, any>) {
    super();

    this.subtitle = fields.subtitle;
    this.title = fields.title;
    this.textBlocks = fields.textBlocks;
    this.hasBorderBottom = fields.hasBorderBottom;
  }
}

export class LogosWithHeadlineSectionModule extends BaseModule {
  subtitle: string;
  title: string;
  description: any[];
  logos: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          height: number;
          width: number;
        };
      };
    };
  }[];

  constructor(fields: Record<string, any>) {
    super();

    this.subtitle = fields.subtitle;
    this.title = fields.title;
    this.description = fields.description;
    this.logos = fields.logos;
  }
}

export class HowCoolSectionModule extends BaseModule {
  title: string;
  bulletPoints: { title: string; description: any[] }[];
  quote: {
    quoteText: string;
    quoteAuthor: {
      firstName: string;
      lastName: string;
      jobTitle: string;
    };
  };

  constructor(fields: Record<string, any>) {
    super();

    this.title = fields.title;
    this.bulletPoints = fields.bulletPoints;
    this.quote = fields.quote;
  }
}

export class AboutTheToolSectionModule extends BaseModule {
  subtitle: string;
  title: string;
  description: any[];
  bulletPoints: string[];
  buttonText: string;
  linkUrl: string;
  facts: { factFigure: string; factTitle: string }[];

  constructor(fields: Record<string, any>) {
    super();

    this.subtitle = fields.subtitle;
    this.title = fields.title;
    this.description = fields.description;
    this.bulletPoints = fields.bulletPoints;
    this.buttonText = fields.buttonText;
    this.linkUrl = fields.linkUrl;
    this.facts = fields.facts;
  }
}

export class TextElementSectionModule extends BaseModule {
  firstBlock: Description[];
  secondBlock: Description[];

  title: string;

  constructor(fields: Record<string, any>) {
    super();

    this.firstBlock = fields.firstBlock;
    this.secondBlock = fields.secondBlock;
    this.title = fields.title;
  }
}

export class OpenJobsListModule extends BaseModule {
  subtitle: string;
  title: string;
  description: string;
  unit: 'saxco' | 'digital' | 'all';

  constructor(fields: Record<string, any>) {
    super();

    this.subtitle = fields.subtitle;
    this.title = fields.title;
    this.description = fields.description;
  }
}

export class GlobalNetworkSectionModule extends BaseModule {
  subtitle: string;
  title: string;
  description: any[];

  constructor(fields: Record<string, any>) {
    super();

    this.subtitle = fields.subtitle;
    this.title = fields.title;
    this.description = fields.description;
  }
}

export interface ISectorsDropdown {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
}

export class TransactionGridSectionModule extends BaseModule {
  buttonText: string;
  sectorsDropdown: ISectorsDropdown[];
  servicesDropdown: {
    name: string;
  }[];
  dropdownsTitle: string;
  hideSectorFilter: boolean;
  constructor(fields: Record<string, any>) {
    super();
    this.buttonText = fields.buttonText;
    this.sectorsDropdown = fields.sectorsDropdown;
    this.servicesDropdown = fields.servicesDropdown;
    this.dropdownsTitle = fields.dropdownsTitle;
    this.hideSectorFilter = fields.hideSectorFilter;
  }

  get sortedSectors(): { name: string }[] {
    return this.sectorsDropdown.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    });
  }

  get sortedServices(): { name: string }[] {
    return this.servicesDropdown.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    });
  }
}

export class CalculatorTeaserSectionModule extends BaseModule {
  title: string;
  description: any[];
  buttonText: string;
  checkmarkTexts: string[];
  calculatorSteps: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
  };
  goToQuestionnaire: {
    questionnaireSlug: {
      current: string;
    };
  };
  hasBackgroundImage: boolean;

  constructor(fields: Record<string, any>) {
    super();

    this.title = fields.title;
    this.description = fields.description;
    this.buttonText = fields.buttonText;
    this.checkmarkTexts = fields.checkmarkTexts;
    this.calculatorSteps = fields.calculatorSteps;
    this.goToQuestionnaire = fields.goToQuestionnaire;
    this.hasBackgroundImage = fields.hasBackgroundImage;
  }

  get questionnaireSlug(): string {
    return this.goToQuestionnaire?.questionnaireSlug?.current;
  }
}

export class CDIGlobalSectionModule extends BaseModule {
  subtitle: string;
  title: string;

  title2: string;
  description: any[];
  button: {
    text: string;
    page: {
      slug: {
        current: string;
      };
    };
  };
  locations: string[];
  sectionType: 'header' | 'content-block';

  constructor(fields: Record<string, any>) {
    super();
    this.subtitle = fields.subtitle;
    this.title = fields.title;
    this.title2 = fields.title2;
    this.description = fields.description;
    this.button = fields.button;
    this.locations = fields.locations;
    this.sectionType = fields.sectionType;
  }
}

export class SectorHeaderSectionModule extends BaseModule {
  buttonText: string;

  constructor(fields: Record<string, any>) {
    super();

    this.buttonText = fields.buttonText;
  }
}

export class SectorsSectionModule extends BaseModule {
  subtitle: string;
  title: string;
  description: any[];
  button: {
    text: string;
    page: {
      slug: {
        current: string;
      };
    };
  };
  sectors: Sector[];

  constructor(fields: Record<string, any>) {
    super();
    this.subtitle = fields.subtitle;
    this.title = fields.title;
    this.description = fields.description;
    this.button = fields.button;
    this.sectors = fields.sectorsGrid;
  }
}

export class TransactionsCarouselSectionModule extends BaseModule {
  subtitle: string;
  title: string;
  description: any[];
  linkText: string;
  transactions: Transaction[];

  constructor(fields: Record<string, any>) {
    super();
    this.subtitle = fields.subtitle;
    this.title = fields.title;
    this.description = fields.description;
    this.linkText = fields.linkText;
    this.transactions = fields.transactions;
  }
}

export class AllTransactionsCarouselSectionModule extends BaseModule {
  subtitle: string;
  title: string;
  description: any[];
  linkText: string;
  transactions: Transaction[];
  sectors: Sector[];
  showAll: boolean;

  button: any;

  constructor(fields: Record<string, any>) {
    super();
    this.subtitle = fields.subtitle;
    this.title = fields.title;
    this.description = fields.description;
    this.linkText = fields.linkText;
    this.showAll = fields.showAll;
    this.sectors = fields.sectors;
    this.button = fields.button;
  }
}

export class FactsAndFiguresSectionModule extends BaseModule {
  subtitle: string;
  title: string;
  description: any[];
  facts: Fact[];

  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.subtitle = fields.subtitle;
    this.description = fields.description;
    this.facts = fields.facts;
  }
}
export class LogoBarSectionModule extends BaseModule {
  title: string;
  logos: {
    asset: {
      url: string;
      alt: string;
    };
  }[];

  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.logos = fields.logos;
  }
}

export class TitleAndDescriptionItemsGridModule extends BaseModule {
  subtitle: string;
  title: string;
  description: any[];
  items: TitleAndDescriptionItem[];

  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.subtitle = fields.subtitle;
    this.description = fields.description;
    this.items = fields.items;
  }
}

export class FactsAndNumbersCDISectionModule extends BaseModule {
  subtitle: string;
  title: string;
  description: any[];
  facts: Fact[];

  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.subtitle = fields.subtitle;
    this.description = fields.description;
    this.facts = fields.facts;
  }
}

export class TimelineSectionModule extends BaseModule {
  subtitle: string;
  title: string;
  description: any[];
  linkText: string;
  services: Service[];

  constructor(fields: Record<string, any>) {
    super();

    this.subtitle = fields.subtitle;
    this.title = fields.title;
    this.description = fields.description;
    this.linkText = fields.linkText;
    this.services = fields.services;
  }
}

export class NewsGridSectionModule extends BaseModule {
  subtitle: string;
  title: string;
  description: any[];
  linkText: string;
  button: {
    text: string;
    page: {
      slug: {
        current: string;
      };
    };
  };
  loadMoreText: string;
  showAllNews: boolean;
  showOnlyCDI: boolean;
  displayDownload: boolean;
  shouldHideCDITransactions?: boolean;
  shouldHidePeopleUpdates?: boolean;
  firstHighlightedArticleSection?: any;
  secondHighlightedArticleSection?: any;
  tilesToShow: number;
  constructor(fields: Record<string, any>) {
    super();

    this.subtitle = fields.subtitle;
    this.title = fields.title;
    this.description = fields.description;
    this.linkText = fields.linkText;

    this.button = fields.button;
    this.loadMoreText = fields.loadMoreText;
    this.showAllNews = fields.showAllNews;
    this.showOnlyCDI = fields.showOnlyCDI;
    this.shouldHideCDITransactions = fields.shouldHideCDITransactions;
    this.shouldHidePeopleUpdates = fields.shouldHidePeopleUpdates;

    this.displayDownload = fields.displayDownload;

    this.firstHighlightedArticleSection = fields.firstHighlightedArticleSection;
    this.secondHighlightedArticleSection =
      fields.secondHighlightedArticleSection;
    this.tilesToShow = fields.tilesToShow;
  }
}

export class HeroSectionModule extends BaseModule {
  title: string;
  title2: string;
  description: any[];
  type: 'home' | 'primary' | 'transaction' | 'career' | 'anchor';
  heroImage: {
    asset: { url: string };
  };
  bottomBackground: {
    asset: { url: string };
  };
  buttonText: string;
  button?: {
    title: string;
    externalUrl: string;
    link: { slug: { current: string } };
    type: 'normal' | 'underline';
  };
  appointment?: {
    title: string;
    calendlyURL: string;
  };

  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.title2 = fields.title2;
    this.description = fields.description;
    this.type = fields.type;
    this.button = fields.button;
    this.appointment = fields.appointment;
    this.heroImage = fields.heroImage;
    this.bottomBackground = fields.bottomBackground;
  }
}

export class DividerImageModule extends BaseModule {
  image: {
    asset: {
      url: string;
    };
  };

  isInContainer: boolean;
  isNoParalax: boolean;
  getImageUrl(): string {
    return this.image.asset?.url;
  }

  constructor(fields: Record<string, any>) {
    super();
    this.image = fields.image;
    this.isInContainer = fields.isInContainer;
    this.isNoParalax = fields.isNoParalax;
  }
}

export class ServicesLargeGridSectionModule extends BaseModule {
  subtitle: string;
  title: string;
  description: any[];
  linkText: string;
  services: Service[];

  constructor(fields: Record<string, any>) {
    super();

    this.subtitle = fields.subtitle;
    this.title = fields.title;
    this.description = fields.description;
    this.linkText = fields.linkText;
    this.services = fields.services;
  }
}

export class TrustSectionModule extends BaseModule {
  textElements: { title: string; subtitle: string }[];

  constructor(fields: Record<string, any>) {
    super();

    this.textElements = fields.textElements;
  }
}

export class TransactionShowcaseSectionModule extends BaseModule {
  subtitle: string;
  title: string;
  description: any[];
  link: {
    title: string;
    page: {
      slug: {
        current: string;
      };
    };
  };
  transaction: Transaction;
  linkText: string;

  constructor(fields: Record<string, any>) {
    super();

    this.subtitle = fields.subtitle;
    this.title = fields.title;
    this.description = fields.description;
    this.link = fields.link;
    this.transaction = fields.transaction;
    this.linkText = fields.linkText;
  }
}

export class AboutUsSectionModule extends BaseModule {
  subtitle: string;
  title: string;
  description: any[];
  link: {
    title: string;
    page: {
      slug: {
        current: string;
      };
    };
  };
  bulletPoints: { title: string; texts: string[] }[];

  constructor(fields: Record<string, any>) {
    super();

    this.subtitle = fields.subtitle;
    this.title = fields.title;
    this.description = fields.description;
    this.link = fields.link;
    this.bulletPoints = fields.bulletPoints;
  }
}

export class ContactUsSectionModule extends BaseModule {
  subtitle: string;
  title: string;
  description: any[];
  appointmentLinkText: string;
  offices: Office[];
  contactForm: {
    title: string;
    description: string;
    buttonText: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phoneNumberPlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    successMessage: string;
    errorMessage: string;
  };

  constructor(fields: Record<string, any>) {
    super();

    this.subtitle = fields.subtitle;
    this.title = fields.title;
    this.description = fields.description;
    this.appointmentLinkText = fields.appointmentLinkText;
    this.offices = fields.offices;
    this.contactForm = fields.contactForm;
  }
}

export class LeadershipTeamSectionModule extends BaseModule {
  subtitle: string;
  title: string;
  description: any[];
  linkText: string;

  constructor(fields: Record<string, any>) {
    super();
    this.subtitle = fields.subtitle;
    this.title = fields.title;
    this.description = fields.description;
    this.linkText = fields.linkText;
  }
}

export class TeamSectionModule extends BaseModule {
  subtitle: string;
  title: string;
  description: any[];
  linkText: string;

  isGridLayout: boolean;

  constructor(fields: Record<string, any>) {
    super();
    this.subtitle = fields.subtitle;
    this.title = fields.title;
    this.description = fields.description;
    this.linkText = fields.linkText;
    this.isGridLayout = fields.isGridLayout;
  }
}

export class CenteredTitleWithSubtitleSectionModule extends BaseModule {
  title: { text: string; color: string }[];
  description: string;

  constructor(fields: Record<string, any>) {
    super();

    this.title = fields.title;
    this.description = fields.description;
  }
}

export class EmployeeCarouselSectionModule extends BaseModule {
  title: string;
  description: string;
  button?: {
    title: string;
    externalUrl: string;
  };
  employees: Employee[];
  cardSubtitle: string;
  jobCard: {
    unit: 'saxco' | 'digital' | 'all';
    qualificationsSubtitle: string;
    image: {
      asset: {
        url: string;
      };
    };
  };

  constructor(fields: Record<string, any>) {
    super();

    this.title = fields.title;
    this.description = fields.description;
    this.button = fields.button;
    this.employees = fields.employees;
    this.cardSubtitle = fields.cardSubtitle;
    this.jobCard = fields.jobCard;
  }
}

export class HeadlineWithBackgroundSectionModule extends BaseModule {
  title: string;
  image: {
    asset: {
      url: string;
    };
  };

  constructor(fields: Record<string, any>) {
    super();

    this.title = fields.title;
    this.image = fields.image;
  }
}

export class TabSectionModule extends BaseModule {
  tabs: {
    title: string;
    subtitle: string;
    description: string;
    image: {
      asset: { url: string };
    };
  }[];

  constructor(fields: Record<string, any>) {
    super();

    this.tabs = fields.tabs;
  }
}

export class JobListWithBgSectionModule extends BaseModule {
  title: { text: string; color: string }[];
  description: string;
  unit: 'saxco' | 'digital' | 'all';

  constructor(fields: Record<string, any>) {
    super();

    this.title = fields.title;
    this.description = fields.description;
    this.unit = fields.unit;
  }
}

export class IconRowSectionModule extends BaseModule {
  iconRows: {
    title: string;
    description: any[];
    icon: {
      iconImage: {
        asset: {
          url: string;
        };
      };
    };
  }[];

  constructor(fields: Record<string, any>) {
    super();

    this.iconRows = fields.iconRows;
  }
}

export class ImageSliderSectionModule extends BaseModule {
  slider: {
    asset: { url: string };
  }[];

  constructor(fields: Record<string, any>) {
    super();

    this.slider = fields.slider;
  }
}

export class TextSliderSectionModule extends BaseModule {
  slider: {
    title: string;
    description: string;
  }[];
  image: {
    asset: { url: string };
  };

  constructor(fields: Record<string, any>) {
    super();

    this.image = fields.image;
    this.slider = fields.slider;
  }
}

export enum serviceDetailSectionNames {
  helpContactPerson = 'helpContactPerson',
  processSection = 'processSection',
  sectorsForThiServiceSection = 'sectorsForThiServiceSection',
  transactionShowcaseSection = 'transactionShowcaseSection',
  serviceTransactionsSection = 'serviceTransactionsSection',
}

export type ContentModuleType =
  | 'whitePaperDownload'
  | 'transactionQuote'
  | 'stickyFooter'
  | 'stepsDownBulletsSection'
  | 'vtServicesSection'
  | 'vtValuesGridSection'
  | 'vtHeroSection'
  | 'imagesGridSection'
  | 'titleTextSection'
  | 'accordion'
  | 'approachListSection'
  | 'textWithImageGrid'
  | 'fiveStepsSection'
  | 'anchoredTextSection'
  | 'heroSection'
  | 'dividerImage'
  | 'servicesLargeGridSection'
  | 'trustSection'
  | 'transactionShowcaseSection'
  | 'aboutUsSection'
  | 'contactUsSection'
  | 'newsGridSection'
  | 'timelineSection'
  | 'sectorsSection'
  | 'transactionsCarouselSection'
  | 'allTransactionsCarouselSection'
  | 'factsAndFiguresSection'
  | 'cdiGlobalSection'
  | 'calculatorTeaserSection'
  | 'transactionGridSection'
  | 'factsAndNumbersCDISection'
  | 'textElementSection'
  | 'globalNetworkSection'
  | 'leadershipTeamSection'
  | 'teamSection'
  | 'sectorHeaderSection'
  | 'aboutTheToolSection'
  | 'howCoolSection'
  | 'logosWithHeadlineSection'
  | 'openJobsListModule'
  | 'disclaimerSection'
  | 'legalNoticeSection'
  | 'titleAndDescriptionItemsGrid'
  | 'employeeCarouselSection'
  | 'headlineWithBackgroundSection'
  | 'tabSection'
  | 'jobListWithBgSection'
  | 'iconRowSection'
  | 'imageSliderSection'
  | 'textSliderSection'
  | 'centeredTitleWithSubtitleSection'
  | 'industryReportSection'
  | 'partnerHeroSection'
  | 'valuationBenefitsSection'
  | 'titleTextAndImageSection'
  | 'partnerStrategySection'
  | 'partnerAboutSection'
  | 'partnerVisionSection'
  | 'partnerAboutWithImageSection'
  | 'partnerPersonQuoteSection'
  | 'partnerLogosAndTextsSection'
  | 'landingPageEnterSurveySection'
  | 'landingPageOurPromiseSection'
  | 'landingPageTrackRecord'
  | 'landingRoadmap'
  | 'brandOverviewSection'
  | 'referralSection'
  | 'dividerLine'
  | 'partnerReviewSection'
  | 'blogIndexSection'
  | 'infoSection'
  | 'growthRateSection'
  | 'teamWithQuoteSection'
  | 'sectorHeroSection'
  | 'futureTrendsSection'
  | 'moreDetailsSection'
  | 'logoBarSection'
  // service detail sections
  | serviceDetailSectionNames.processSection
  | serviceDetailSectionNames.helpContactPerson
  | serviceDetailSectionNames.sectorsForThiServiceSection
  | serviceDetailSectionNames.serviceTransactionsSection
  | serviceDetailSectionNames.transactionShowcaseSection;

abstract class ContentModuleTypeFactory {
  static createInstance(type: ContentModuleType, fields: Record<string, any>) {
    if (type === 'partnerReviewSection') return new PartnerReviewModule(fields);
    if (type === 'dividerLine') return new DividerLineModule();
    if (type === 'logoBarSection') return new LogoBarSectionModule(fields);
    if (type === 'whitePaperDownload')
      return new WhitePaperDownloadModule(fields);
    if (type === 'stickyFooter') return new StickyFooterModule(fields);
    if (type === 'transactionQuote') return new TransactionQuoteModule(fields);
    if (type === 'stepsDownBulletsSection')
      return new StepsDownBulletsSectionModule(fields);
    if (type === 'vtServicesSection')
      return new VTServicesSectionModule(fields);
    if (type === 'vtValuesGridSection')
      return new VTValuesGridSectionModule(fields);
    if (type === 'vtHeroSection') return new VTHeroModule(fields);
    if (type === 'imagesGridSection')
      return new ImagesGridSectionModule(fields);
    if (type === 'titleTextSection') return new TitleTextSectionModule(fields);
    if (type === 'accordion') return new AccordionSectionModule(fields);
    if (type === 'approachListSection')
      return new ApproachListSectionModule(fields);
    if (type === 'textWithImageGrid')
      return new TextWithImageGridModule(fields);
    if (type === 'fiveStepsSection') return new FiveStepsSectionModule(fields);
    if (type === 'anchoredTextSection')
      return new AnchoredTextSectionModule(fields);
    if (type === 'heroSection') return new HeroSectionModule(fields);
    if (type === 'infoSection') return fields;
    if (type === 'growthRateSection') return fields;
    if (type === 'teamWithQuoteSection') return fields;
    if (type === 'sectorHeroSection') return fields;
    if (type === 'futureTrendsSection') return fields;
    if (type === 'moreDetailsSection') return fields;
    if (type === 'dividerImage') return new DividerImageModule(fields);
    if (type === 'servicesLargeGridSection')
      return new ServicesLargeGridSectionModule(fields);
    if (type === 'trustSection') return new TrustSectionModule(fields);
    if (type === 'transactionShowcaseSection')
      return new TransactionShowcaseSectionModule(fields);
    if (type === 'aboutUsSection') return new AboutUsSectionModule(fields);
    if (type === 'contactUsSection') return new ContactUsSectionModule(fields);
    if (type === 'newsGridSection') return new NewsGridSectionModule(fields);
    if (type === 'timelineSection') {
      return new TimelineSectionModule(fields);
    }
    if (type === 'sectorsSection') {
      return new SectorsSectionModule(fields);
    }
    if (type === 'factsAndFiguresSection') {
      return new FactsAndFiguresSectionModule(fields);
    }
    if (type === 'titleAndDescriptionItemsGrid') {
      return new TitleAndDescriptionItemsGridModule(fields);
    }
    if (type === 'openJobsListModule') {
      return new OpenJobsListModule(fields);
    }
    if (type === 'transactionsCarouselSection')
      return new TransactionsCarouselSectionModule(fields);
    if (type === 'allTransactionsCarouselSection') {
      return new AllTransactionsCarouselSectionModule(fields);
    }
    if (type === 'cdiGlobalSection') return new CDIGlobalSectionModule(fields);
    if (type === 'calculatorTeaserSection')
      return new CalculatorTeaserSectionModule(fields);
    if (type === 'transactionGridSection')
      return new TransactionGridSectionModule(fields);
    if (type === 'globalNetworkSection')
      return new GlobalNetworkSectionModule(fields);
    if (type === 'factsAndNumbersCDISection')
      return new FactsAndNumbersCDISectionModule(fields);
    if (type === 'textElementSection')
      return new TextElementSectionModule(fields);
    if (type === 'leadershipTeamSection')
      return new LeadershipTeamSectionModule(fields);
    if (type === 'teamSection') return new TeamSectionModule(fields);
    if (type === 'sectorHeaderSection')
      return new SectorHeaderSectionModule(fields);
    if (type === 'aboutTheToolSection')
      return new AboutTheToolSectionModule(fields);
    if (type === 'howCoolSection') return new HowCoolSectionModule(fields);
    if (type === 'logosWithHeadlineSection')
      return new LogosWithHeadlineSectionModule(fields);
    if (type === 'legalNoticeSection')
      return new LegalNoticeSectionModule(fields);
    if (type === 'disclaimerSection')
      return new DisclaimerSectionModule(fields);
    if (type === 'centeredTitleWithSubtitleSection')
      return new CenteredTitleWithSubtitleSectionModule(fields);
    if (type === 'employeeCarouselSection')
      return new EmployeeCarouselSectionModule(fields);
    if (type === 'headlineWithBackgroundSection')
      return new HeadlineWithBackgroundSectionModule(fields);
    if (type === 'tabSection') return new TabSectionModule(fields);
    if (type === 'jobListWithBgSection')
      return new JobListWithBgSectionModule(fields);
    if (type === 'iconRowSection') return new IconRowSectionModule(fields);
    if (type === 'imageSliderSection')
      return new ImageSliderSectionModule(fields);
    if (type === 'textSliderSection')
      return new TextSliderSectionModule(fields);
    if (type === 'industryReportSection') {
      return new IndustryReportSectionModule(fields);
    }
    if (type === 'partnerHeroSection') {
      return new PartnerHeroModule(fields);
    }
    if (type === 'titleTextAndImageSection') {
      return new TitleTextAndImageSectionModule(fields);
    }
    if (type === 'valuationBenefitsSection') {
      return new ValuationBenefitsSectionModule(fields);
    }

    if (type === 'partnerStrategySection') {
      return new PartnerStrategyModule(fields);
    }

    if (type === 'partnerAboutSection') {
      return new PartnerAboutModule(fields);
    }

    if (type === 'partnerVisionSection') {
      return new PartnerVisionModule(fields);
    }
    if (type === 'brandOverviewSection') {
      return new BrandOverviewSectionModule(fields);
    }

    if (type === 'referralSection') {
      return new ReferralSectionModule(fields);
    }

    if (type === 'partnerAboutWithImageSection') {
      return new PartnerAboutWithImageModule(fields);
    }

    if (type === 'partnerPersonQuoteSection') {
      return new PartnerPersonQuoteModule(fields);
    }

    if (type === 'partnerLogosAndTextsSection') {
      return new PartnerLogosAndTextsModule(fields);
    }

    if (type === 'landingPageEnterSurveySection') {
      return new LandingPageEnterSurveySectionModule(fields);
    }
    if (type === 'landingPageOurPromiseSection') {
      return new LandingPageOurPromiseSectionModule(fields);
    }

    if (type === 'landingPageTrackRecord') {
      return new LandingPageTrackRecordModule(fields);
    }

    if (type === 'landingRoadmap') {
      return new LandingRoadmapModule(fields);
    }
  }
}

export class ContentModule {
  _key: string;
  _type?: string;
  specificContentModule: BaseModule;

  constructor(_key: string, specificContentModule: BaseModule) {
    this._key = _key;
    this.specificContentModule = specificContentModule;
  }

  static create(params: {
    _key: string;
    _type: ContentModuleType;
  }): ContentModule {
    return new ContentModule(
      params._key,
      ContentModuleTypeFactory.createInstance(params._type, params),
    );
  }
}

export class PartnerHeroModule extends BaseModule {
  title: string;
  subtitle: string;
  buttonCaption: string;
  buttonUrl: string;
  heroPartnerLogo: {
    asset: {
      url: string;
    };
  };

  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.subtitle = fields.subtitle;
    this.buttonCaption = fields.buttonCaption;
    this.buttonUrl = fields.buttonUrl;
    this.heroPartnerLogo = fields.heroPartnerLogo;
  }
}

export class PartnerStrategyModule extends BaseModule {
  title: string;
  subtitle: string;
  text1: string;
  text2: string;
  cardLeftText: string;
  topics: string[];
  iconTopics: {
    iconImage: {
      asset: {
        url: string;
      };
    };
  };
  cardButtonText: string;
  cardButtonUrl: string;

  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.subtitle = fields.subtitle;
    this.text1 = fields.text1;
    this.text2 = fields.text2;
    this.cardLeftText = fields.cardLeftText;
    this.topics = fields.topics;
    this.iconTopics = fields.iconTopics;
    this.cardButtonText = fields.cardButtonText;
    this.cardButtonUrl = fields.cardButtonUrl;
  }
}

export class PartnerAboutModule extends BaseModule {
  topImage: {
    asset: {
      url: string;
    };
  };
  title: string;
  subtitle: string;
  aboutText1: string;
  aboutText2: string;
  aboutText3: string;
  aboutText4: string;
  textWithIcon1: {
    title: string;
    icon: any;
  };
  textWithIcon2: {
    title: string;
    icon: any;
  };
  textWithIcon3: {
    title: string;
    icon: any;
  };
  textWithIcon4: {
    title: string;
    icon: any;
  };

  constructor(fields: Record<string, any>) {
    super();
    this.topImage = fields.topImage;
    this.title = fields.title;
    this.subtitle = fields.subtitle;
    this.aboutText1 = fields.aboutText1;
    this.aboutText2 = fields.aboutText2;
    this.aboutText3 = fields.aboutText3;
    this.aboutText4 = fields.aboutText4;
    this.textWithIcon1 = fields.textWithIcon1;
    this.textWithIcon2 = fields.textWithIcon2;
    this.textWithIcon3 = fields.textWithIcon3;
    this.textWithIcon4 = fields.textWithIcon4;
  }
}

export class PartnerVisionModule extends BaseModule {
  title: string;
  subtitle: string;
  description: string;
  bulletTitle: string;
  bulletPoints: { title: string; description: any[] }[];

  constructor(fields: Record<string, any>) {
    super();
    this.bulletPoints = fields.bulletPoints;
    this.title = fields.title;
    this.subtitle = fields.subtitle;
    this.description = fields.description;
    this.bulletTitle = fields.bulletTitle;
  }
}

export class BrandOverviewSectionModule extends BaseModule {
  title: string;
  subtitle: string;
  brands: {
    image: {
      asset: {
        url: string;
      };
    };
    description: any[];
  }[];

  constructor(fields: Record<string, any>) {
    super();
    this.brands = fields.brands;
    this.title = fields.title;
    this.subtitle = fields.subtitle;
  }
}

export class ReferralSectionModule extends BaseModule {
  title: string;
  review1: {
    quote: string;
    author: string;
    source: string;
    rating: {
      asset: {
        url: string;
      };
    };
  };
  review2: {
    quote: string;
    author: string;
    source: string;
    rating: {
      asset: {
        url: string;
      };
    };
  };
  image: {
    asset: {
      url: string;
    };
  };

  constructor(fields: Record<string, any>) {
    super();
    this.review1 = fields.review1;
    this.review2 = fields.review2;
    this.title = fields.title;
    this.image = fields.image;
  }
}

export class PartnerLogosAndTextsModule extends BaseModule {
  title: string;
  subtitle: string;
  description: string;
  logo1: any;
  logo2: any;
  logo3: any;

  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.subtitle = fields.subtitle;
    this.description = fields.description;
    this.logo1 = fields.logo1;
    this.logo2 = fields.logo2;
    this.logo3 = fields.logo3;
  }
}

export class PartnerPersonQuoteModule extends BaseModule {
  quoteOwnerPosition: string;
  title: any;
  partnerImageLabel: string;
  quoteText: string;
  quoteOwner: string;
  image: {
    asset: { url: string };
  };

  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.quoteOwnerPosition = fields.quoteOwnerPosition;
    this.quoteOwner = fields.quoteOwner;
    this.partnerImageLabel = fields.partnerImageLabel;
    this.quoteText = fields.quoteText;
    this.image = fields.image;
  }
}

export class PartnerAboutWithImageModule extends BaseModule {
  description: string;
  title: any;
  image: {
    asset: { url: string };
  };

  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.description = fields.description;
    this.image = fields.image;
  }
}

export class PartnerReviewModule extends BaseModule {
  title: string;
  subtitle: string;
  partnerItem: any[];
  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.subtitle = fields.subtitle;
    this.partnerItem = fields.partnerItem;
  }
}

export class LandingPageTrackRecordModule extends BaseModule {
  description: string;
  title: any;
  transactions: Transaction[];
  buttonText: string;
  buttonTarget: any;

  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.description = fields.description;
    this.transactions = fields.transactions;
    this.buttonText = fields.buttonText;
    this.buttonTarget = fields.buttonTarget;
  }
}

export class LandingRoadmapModule extends BaseModule {
  description: string;
  title: any;
  items: any[];

  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.description = fields.description;
    this.items = fields.items;
  }
}

export class LandingPageEnterSurveySectionModule extends BaseModule {
  title: string;
  description: string;
  image: {
    asset: {
      url: string;
    };
  };
  bgImage: {
    asset: {
      url: string;
    };
  };
  topics: string[];
  buttonText: string;
  buttonTarget: {
    questionnaireSlug: { current: string };
  };
  iconTopics: {
    iconImage: {
      asset: {
        url: string;
      };
    };
  };
  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.description = fields.description;
    this.image = fields.image;
    this.bgImage = fields.bgImage;
    this.topics = fields.topics;
    this.buttonText = fields.buttonText;
    this.buttonTarget = fields.buttonTarget;
    this.iconTopics = fields.iconTopics;
  }
}

export class LandingPageOurPromiseSectionModule extends BaseModule {
  title: string;
  description: string;
  items: any[];
  bgImage: {
    asset: {
      url: string;
    };
  };
  topics: string[];
  iconTopics: {
    iconImage: {
      asset: {
        url: string;
      };
    };
  };
  firstText: string;
  secondText: any[] | string;

  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.description = fields.description;
    this.firstText = fields.firstText;
    this.secondText = fields.secondText;
    this.description = fields.description;
    this.bgImage = fields.bgImage;
    this.topics = fields.topics;
    this.iconTopics = fields.iconTopics;
  }
}

export class AnchoredTextSectionModule extends BaseModule {
  title: string;
  textBlocks: any[];

  hasBorderBottom: boolean;
  hideSection: boolean;
  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.textBlocks = fields.textBlocks;
    this.hasBorderBottom = fields.hasBorderBottom;
    this.hideSection = fields.hideSection;
  }
}

export class FiveStepsSectionModule extends BaseModule {
  title: string;
  subtitle: string;
  steps: any[];

  bottomTitle: string;

  button: any;
  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.subtitle = fields.subtitle;
    this.steps = fields.steps;
    this.bottomTitle = fields.bottomTitle;
    this.button = fields.button;
  }
}

export class TextWithImageGridModule extends BaseModule {
  title: string;
  subtitle: string;
  description: any[];
  background: 'gradient' | 'primary' | 'secondary' | 'tertiary' | 'light';
  button: any;
  image: any;

  bullets: any[];
  servicesCards: any[];
  alignServicesCenter: boolean;
  noServiceCardsBoldTitle: boolean;

  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.subtitle = fields.subtitle;
    this.description = fields.description;
    this.background = fields.background;
    this.button = fields.button;
    this.image = fields.image;
    this.bullets = fields.bullets;
    this.servicesCards = fields.servicesCards;
    this.alignServicesCenter = fields.alignServicesCenter;
    this.noServiceCardsBoldTitle = fields.noServiceCardsBoldTitle;
  }
}

export class ApproachListSectionModule extends BaseModule {
  title: string;
  subtitle: string;
  description: any[];
  textBlocks: any[];
  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.subtitle = fields.subtitle;
    this.description = fields.description;
    this.textBlocks = fields.textBlocks;
  }
}

export class AccordionSectionModule extends BaseModule {
  title: string;
  subtitle: string;
  description: any[];
  accordionItems: any[];
  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.subtitle = fields.subtitle;
    this.description = fields.description;
    this.accordionItems = fields.accordionItems;
  }
}

export class TitleTextSectionModule extends BaseModule {
  title: string;
  subtitle: string;
  description: any[];
  leftButtons: any[];
  rightButtons: any[];
  servicesCards: any[];
  alignServicesCenter: boolean;
  noServiceCardsBoldTitle: boolean;
  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.subtitle = fields.subtitle;
    this.description = fields.description;
    this.leftButtons = fields.leftButtons;
    this.leftButtons = fields.leftButtons;
    this.rightButtons = fields.rightButtons;
    this.servicesCards = fields.servicesCards;
    this.alignServicesCenter = fields.alignServicesCenter;
    this.noServiceCardsBoldTitle = fields.noServiceCardsBoldTitle;
  }
}

export class ImagesGridSectionModule extends BaseModule {
  images: any[];
  constructor(fields: Record<string, any>) {
    super();
    this.images = fields.images;
  }
}

export class VTHeroModule extends BaseModule {
  title: string;
  title2: string;
  description: any[];
  buttons?: any[];
  purposesTitle: string;
  purposes: any[];
  removeHeaderHeight?: boolean;

  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.title2 = fields.title2;
    this.description = fields.description;
    this.buttons = fields.buttons;
    this.purposesTitle = fields.purposesTitle;
    this.purposes = fields.purposes;
    this.removeHeaderHeight = fields.removeHeaderHeight;
  }
}

export class VTValuesGridSectionModule extends BaseModule {
  title: string;
  description: any[];
  button?: any;
  values: any[];

  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.description = fields.description;
    this.button = fields.button;
    this.values = fields.values;
  }
}

export class VTServicesSectionModule extends BaseModule {
  title: string;
  subtitle: string;
  description: any[];
  background: 'gradient' | 'primary' | 'secondary' | 'tertiary' | 'light';
  vtServices: any[];

  isFullWidth: boolean;
  button: any;
  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.subtitle = fields.subtitle;
    this.description = fields.description;
    this.background = fields.background;
    this.vtServices = fields.vtServices;
    this.isFullWidth = fields.isFullWidth;
    this.button = fields.button;
  }
}

export class StepsDownBulletsSectionModule extends BaseModule {
  title: string;
  subtitle: string;
  description: any[];
  steps: any[];
  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.subtitle = fields.subtitle;
    this.description = fields.description;
    this.steps = fields.steps;
  }
}

export class StickyFooterModule extends BaseModule {
  button: any;
  constructor(fields: Record<string, any>) {
    super();
    this.button = fields.button;
  }
}

export class TransactionQuoteModule extends BaseModule {
  title: string;
  subtitle: string;
  quoteText: string;
  name: string;
  position: string;
  photo: any;
  transaction: Transaction;
  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.subtitle = fields.subtitle;
    this.quoteText = fields.quoteText;
    this.position = fields.position;
    this.name = fields.name;
    this.photo = fields.photo;
    this.transaction = fields.transaction;
  }
}

export class DividerLineModule extends BaseModule {
  constructor() {
    super();
  }
}

export class WhitePaperDownloadModule extends BaseModule {
  title: string;
  subtitle: string;
  description: string;
  image: any;
  file: any;
  pdfUrl: any;
  whitePaperFormFields: any[];
  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.subtitle = fields.subtitle;
    this.description = fields.description;
    this.image = fields.image;
    this.file = fields.file;
    this.whitePaperFormFields = fields.whitePaperFormFields;
    this.pdfUrl = fields.pdfUrl;
  }
}
