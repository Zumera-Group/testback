import { Employee } from 'lib/shared-domain/employees/domain';
import { Report, Sector } from 'lib/shared-domain/page/domain';
import { Description } from '../../page/domain/index';
import { Office } from '../../offices/domain/index';
import { IndustryReportSectionModule } from '../../page/domain/contentModule';

export interface Partner {
  fullName: string;
  jobTitle: string;
  picture: {
    asset: {
      url: string;
    };
  };
  logo: {
    asset: {
      url: string;
    };
  };
}

export interface NewsArticle {
  queryOtherLangSlug: {
    slug: { current: string };
  }[];
  isPressRelease: boolean;
  detailPageImageFit: 'cover' | 'contain';
  pictureImageFit: 'cover' | 'contain';
  _id: string;
  _lang: string;
  title: string;
  slug: { current: string };
  subtitle: string;
  date: Date;
  picture: {
    asset: {
      url: string;
    };
  };
  secondPicture: {
    asset: {
      url: string;
    };
  };
  newArticleSection: {
    articleText: string;
    articleTextRichEditor: Description[];
    secondTitle: string;
    secondDescription: string;
    secondDescriptionRichText: Description[];
    articleTextTitle?: string;
    conclusion: string;
    conclusionTitle: string;
    conclusionRichText: Description[];
    links: { title: string; url: string }[];
    facts: { title: string; subtitle: string }[];
  };
  sectors: Sector[];
  hasCDIRelation: boolean;
  office: Office;
  team: Employee[];
  reportDownloadSection: {
    title: string;
    description: string;
    report: Report;
  };
  isEvent: boolean;
  aboutTheEvent?: {
    subtitle: string;
    title: string;
    description: Description[];
    eventExplanation: Description[];
    iframeId: string;
    iframeUrl: string;
    iframeCode: string;
  };
  eventRefereesSection?: Employee[];
  eventPartnerRefereesSection?: {
    subtitle: string;
    title: string;
    description: Description[];
    partners: Partner[];
  }[];
  whyToAttendSection?: {
    description: Description[];
    bulletPoints: string[];
  };
  programSection?: {
    city: string;
    date: string;
    program: {
      startHourTime: string;
      startMinTime: string;
      title: string;
      description: string;
      speaker: string;
      logo: {
        asset: {
          url: string;
        };
      };
    }[];
  }[];
  industryReportSection: IndustryReportSectionModule;
}
