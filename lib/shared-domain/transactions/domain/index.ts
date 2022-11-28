import { Sector } from '../../page/domain/index';
import { Employee } from '../../employees/domain/index';
import { Office } from 'lib/shared-domain/offices/domain';
import { NewsArticle } from '../../newsArticle/domain/index';

export interface TransactionInvolvedParty {
  name: string;
  quote: string;
  companyLogo: {
    asset: {
      url: string;
    };
  };
  jobTitle: string;
}

export interface optionalUI {
  hasAchievedTransactionMultiples: boolean;
  achievedTransactionMultiple: number;
  sectorMultipleAverage: number;
  hasInvolvedParties: boolean;
  involvedPartyHeader: {
    subtitle: string;
    title: string;
    description: string;
  };
  involvedParty1: TransactionInvolvedParty;
  involvedParty2: TransactionInvolvedParty;
}

export interface Transaction {
  queryOtherLangSlug: {
    slug: { current: string };
  }[];
  location?: Office;
  _id: string;
  slug: {
    current: string;
  };
  _lang: string;
  optionalUI?: optionalUI;
  sectors?: Sector[];
  typeOfService: {
    _id: string;
    name: string;
    description: string;
  };
  companyLogo1: {
    asset: {
      url: string;
    };
  };
  companyLogo2: {
    asset: {
      url: string;
    };
  };
  companyName1: string;
  companyName2: string;
  companySubHeadline1: string;
  companySubHeadline2: string;
  companyDescription1: string;
  companyDescription2: string;
  headline: string;
  subHeadline: string;
  description: string;
  subtitleForCard: string;
  date: Date;
  processDescription: string;
  keyFacts: { title: string; subtitle: string }[];
  valueFacts: { title: string; subtitle: string }[];
  representedBySaxenhammer: null | 'company-1' | 'company-2';
  peopleInvolved: Employee[];
  hasCDIRelation: boolean;
  newsPressRelease: NewsArticle;
}
