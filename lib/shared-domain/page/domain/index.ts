import { Employee } from 'lib/shared-domain/employees/domain';
import { Transaction } from 'lib/shared-domain/transactions/domain';
import {
  ContactUsSectionModule,
  ContentModule,
  ContentModuleType,
  IndustryReportSectionModule,
} from './contentModule';
import { Questionnaire } from '../../questionnaire/domain/index';

export interface Page {
  isHeaderRoutesHidden: boolean;
  isFooterHidden: boolean;
  hideNavMenu: boolean;
  hideFooterSitemap: boolean;
  slug: {
    current: string;
  };
  includeInSitemap: boolean;
  disallowInRobotsTxt: boolean;
  _id: string;
  _lang: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  seoImage: {
    asset: {
      url: string;
    };
  };
  hidePage: boolean;
  contentModules: {
    _key: string;
    _type: ContentModuleType;
  }[];
  queryOtherLangSlug: {
    slug: { current: string };
  }[];

  darkBg: boolean;
}

export interface IAnnouncementTopBanner {
  text: string;
  buttonText: string;
  buttonLink: string;
  buttonPageLink: any;
  isEnabled: boolean;
}

export interface SiteSettings {
  announcementTopBanner: IAnnouncementTopBanner;
  isUnderSecretKey: boolean;
  footerCopyright: string;
  footerPrivacyPolice: {
    name: string;
    page: {
      slug: {
        current: string;
      };
    };
  };
  contactSectionContent: ContactUsSectionModule;
  footerSocialLinks: {
    _key: string;
    link: string;
    icon: {
      iconImage: {
        asset: {
          url: string;
        };
      };
    };
    iconDark: {
      iconImage: {
        asset: {
          url: string;
        };
      };
    };
  }[];
  footerTermsOfService: {
    name: string;
    page: {
      slug: {
        current: string;
      };
    };
  };
  siteName: string;
  homePage: {
    slug: {
      current: string;
    };
  };
  sectorsOverviewPage: {
    slug: {
      current: string;
    };
  };
  transactionsOverviewPage: {
    slug: {
      current: string;
    };
  };
  headerMenu: {
    name: string;
    page: {
      slug: {
        current: string;
      };
    };
  }[];
  hamburgerMenu: {
    name: string;
    type: 'normal' | 'sectors' | 'services' | 'blogArticles';
    page: {
      slug: {
        current: string;
      };
    };
    serviceMenuItems?: Service[];
    sectorMenuItems?: Sector[];
  }[];
  footerMenu: {
    type: 'normal' | 'sectors' | 'services' | 'tools';
    title: string;
    _key: string;
    menuItems?: {
      _key: string;
      name: string;
      page: {
        slug: {
          current: string;
        };
      };
    }[];
    toolsMenuItems?: {
      _key: string;
      name: string;
      page: Questionnaire;
    }[];
    serviceMenuItems?: Service[];
    sectorMenuItems?: Sector[];
  }[];
  logo: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          height: number;
          width: number;
        };
      };
    };
  };
  darkLogo: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          height: number;
          width: number;
        };
      };
    };
  };
  logoMobile: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          height: number;
          width: number;
        };
      };
    };
  };
  darkLogoMobile: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          height: number;
          width: number;
        };
      };
    };
  };
  _id: string;
  _lang: string;
}

export interface Fact {
  _id: string;
  factTitle: string;
  factSubtitle: string;
  factDescription: Description[];
}

export interface TitleAndDescriptionItem {
  title: string;
  description: string;
}

export interface Report {
  title: string;
  description: string;
  emailPlaceholder: string;
  buttonText: string;
  file: {
    asset: {
      url: string;
    };
  };
}

export interface Sector {
  queryOtherLangSlug: {
    slug: { current: string };
  }[];
  detailPageHeroImage: any;
  _ref: any;
  _key: any;
  name: string;
  _id: string;
  _lang: string;
  description: string;
  hidePage: boolean;
  heroSectionSubtitles: string[];
  growthRatesTable: {
    growthRatesTableTitle: string;
    growthRates: { title: string; subtitle: string }[];
  };

  trendsTable: {
    trendsTableTitle: string;
    trends: { title: string; subtitle: string }[];
  };
  transactionsTable: {
    mAndATransactionsNumber: string;
    significantTransactions: {
      company1: string;
      company2: string;
      year: number;
    }[];
    mostPopularTransaction: Transaction;
  };
  report: Report;
  futureTrendsSection: {
    title: string;
    trendDescription: string;
  };
  trendsImage: {
    asset: {
      url: string;
    };
  };
  infoSection: {
    title: string;
    subtitle: string;
    description: string;
  };
  moreDetailsSection: {
    title: string;
    subtitle: string;
    moreDetailsDescription: string;
    sectorMoreDetailsPicture: {
      asset: {
        url: string;
      };
    };
  };
  teamSection: {
    title: string;
    subtitle: string;
    description: string;
    linkText: string;
    quote: string;
    author: Employee;
  };
  calculatorTeaserSection: ServiceCalculatorTeaserSection;
  type: string;
  date: Date;
  slug: {
    current: string;
  };
  questionnaire: {
    questionnaireSlug: {
      current: string;
    };
  };
  graph: {
    iconImage: {
      name: string;
      asset: {
        url: string;
        metadata: {
          dimensions: {
            height: number;
            width: number;
          };
        };
      };
    };
  };
  contributors: Employee[];
  accordionAnswers: string[];
  id: string;
  sectorSheetName: string;
  industries: {
    id: string;
    name: string;
    industrySheetName: string;
  }[];
  industryReportSection: IndustryReportSectionModule;
}

export interface Description {
  _key: string;
  children: {
    _key: string;
    marks: any[];
    text: string;
  }[];
  markDefs: any[];
  style: string;
}

export interface ServiceProcessData {
  subtitle: string;
  title: string;
  description: Description[];
  graph: {
    asset: {
      url: string;
    };
  };
  steps: string[];
}

export interface ServiceHelpContactSection {
  description: Description[];
  title: string;
  subtitle: string;
  checkmarkTexts: string[];
  employee: Employee;
  cardTitle: string;
  linkText: string;
  appointmentLinkUrl: string;
}

export interface ServiceSectorsSection {
  description: Description[];
  title: string;
  subtitle: string;
  sectors: Sector[];
  linkText: string;
}

export interface ServiceTransactionShowcaseSection {
  description: Description[];
  title: string;
  subtitle: string;
  linkTextInTransactionCard: string;
  linkText: string;
}

export interface ServiceTransactionsSection {
  description: Description[];
  title: string;
  subtitle: string;
  linkTextInTransactionCard: string;
}

export interface ServiceCalculatorTeaserSection {
  description: Description[];
  title: string;
  checkmarkTexts: string[];
  buttonText: string;
  calculatorSteps: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
  };
  questionnaire: {
    questionnaireSlug: {
      current: string;
    };
  };
}

export interface Tab {
  _key: string;
  title: string;
  contentModules: {
    _key: string;
    _type: ContentModuleType;
  }[];
}

export interface Service {
  queryOtherLangSlug: {
    slug: { current: string };
  }[];
  name: string;
  description: string;
  shortDescription: string;
  helpContactPerson?: ServiceHelpContactSection;
  processSection?: ServiceProcessData;
  sectorsForThiServiceSection?: ServiceSectorsSection;
  transactionShowcaseSection?: ServiceTransactionShowcaseSection;
  serviceTransactionsSection?: ServiceTransactionsSection;
  calculatorTeaserSection?: ServiceCalculatorTeaserSection;
  _id: string;
  _lang: string;
  slug: {
    current: string;
  };
  hidePage: boolean;
  tabs: Tab[];
}

export interface IndustryReport {
  description: Description[];
  downloadSection: {
    buttonText: string;
    emailPlaceholder: string;
  };
  image: {
    asset: {
      url: string;
    };
  };
  file: {
    asset: {
      url: string;
    };
  };
  subtitle: string;
  title: string;
}
