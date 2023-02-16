import { Office } from 'lib/shared-domain/offices/domain';
import { Report, Sector } from 'lib/shared-domain/page/domain';
import { Description } from '../../page/domain/index';

interface Picture {
  asset?: {
    url: string;
  };
  picture?: {
    asset: {
      url: string;
    };
  };
  type: 'headshot' | 'standing' | 'sitting';
}

export interface Employee {
  queryOtherLangSlug: {
    slug: { current: string };
  }[];
  leadershipListIndex: number;
  _id: string;
  _lang: string;
  slug: {
    current: string;
  };
  hidePage: boolean;
  _createdAt: Date;
  title: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  mobile: string;
  phone: string;
  email: string;
  detailPagePicture: Picture;
  newsGridPicture: Picture;
  cardPicture: Picture;
  sectors?: Sector[];
  qualifications: string[];
  office?: Office;
  description: any[];
  linkedInUrl: string;
  facts: string[];
  isInLeadershipTeam: boolean;
  hasLeftTheTeam: boolean;
  isDisplayedInLeadershipTeamBigCard: boolean;
  listOrderIndex: number;
  moreMembersSection: {
    title: string;
    subtitle: string;
    description: Description[];
    viewMoreLink: {
      linkHref: string;
      linkText: string;
    };
    cardEmployeeLink: string;
  };
  reportDownloadSection: {
    title: string;
    description: string;
    report: Report;
  };
}
