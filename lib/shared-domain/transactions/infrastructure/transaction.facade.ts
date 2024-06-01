import { Locale } from 'lib/locale';
import { SanityService } from 'lib/services/sanity.service';
import { Transaction } from '../domain';
import {
  filterDataToSingleItem,
  getOtherLangSlugQuery,
} from '../../page/infrastructure/page.facade';
import { SERVER_FETCHING_ERROR } from '../../page/constants';

const queryTransactionDetail = (
  lang,
  slug,
  otherLangSlugQuery,
) => `*[_type == "transaction" && slug.current == "${slug}" && _lang == "${lang}"] {
  ...,
  _id,
  _lang,
  location-> {
    ...,
  },
  optionalUI {
    hasAchievedTransactionMultiples,
    hasInvolvedParties,
    achievedTransactionMultiple,
    sectorMultipleAverage,
    involvedPartyHeader {
      subtitle,
      description,
      title,
    },
    involvedParty1 {
      name,
      quote,
      companyLogo {
        asset->{
          url
        },
      },
      jobTitle,
      mobile,
      phone,
      email,
    },
    involvedParty2 {
      name,
      quote,
      companyLogo {
        asset->{
          url
        },
      },
      jobTitle,
      mobile,
      phone,
      email,
    },
  },
  companyLogo {
    asset->{
      url
    },
  },
  companyLogo1 {
    asset->{
      url
    },
  },
  companyLogo2 {
    asset->{
      url
    },
  },
  typeOfService-> {
    ...,
    name
  },
  peopleInvolved[]-> {
    ...,
    firstName,
    lastName,
    cardPicture {
    picture {
      asset->{
        url
      },
    }
    }
  },
  sectors[]-> {
    ...,
    name,
    detailPageHeroImage {
      asset->{
        url,
      }
    },
    graph->{
      iconImage{
        asset->{
          url,
          metadata{
            dimensions{
              height,
              width
            }
          }
        }
      }
    }
  },
  location-> {
    ...,
  },
  newsPressRelease-> {
    ...,
    slug {
      current
    }
  },
  "queryOtherLangSlug": ${otherLangSlugQuery},
}`;

const queryTransactions = (
  lang,
) => `*[_type == "transaction" && _lang == "${lang}" && (hidePage == false || !defined(hidePage))] {
  ...,
  _id,
  _lang,
  optionalUI {
    hasAchievedTransactionMultiples,
    achievedTransactionMultiple,
    sectorMultipleAverage
  },
  peopleInvolved[]-> {
    ...,
    firstName,
    lastName,
    picture {
      asset->{
        url
      },
    }
  },
  companyLogo1 {
    asset->{
      url
    },
  },
  companyLogo2 {
    asset->{
      url
    },
  },
  typeOfService-> {
    ...,
    name
  },
  sectors[]-> {
    ...,
    name,
    graph->{
      iconImage{
        asset->{
          url,
          metadata{
            dimensions{
              height,
              width
            }
          }
        }
      }
    }
  },
  location-> {
    ...,
  },
  newsPressRelease-> {
    ...,
    slug {
      current
    }
  }
}`;

const queryTransactionDetailContent = (
  lang,
) => `*[_type == "transactionDetailContent" && _lang == "${lang}"] {
  ...,
}`;

export class TransactionFacade {
  constructor(private readonly sanityService = new SanityService()) {}

  async getTransactionDetail(
    lang: Locale,
    slug: string,
    preview?: boolean,
  ): Promise<{ transactionDetail: Transaction; query: string }> {
    const query = queryTransactionDetail(
      this.sanityService.getSanityLocale(lang),
      slug,
      getOtherLangSlugQuery(lang, 'transaction'),
    );
    const data = await this.sanityService.fetch(query, preview);
    if (!data) {
      throw new Error(SERVER_FETCHING_ERROR);
    }

    const transactionDetail = filterDataToSingleItem(data, preview);

    return { transactionDetail, query };
  }

  async getTransactions(lang: Locale): Promise<Transaction[]> {
    const transactions = await this.sanityService.fetch(
      queryTransactions(this.sanityService.getSanityLocale(lang)),
    );

    return transactions;
  }

  async getTransactionDetailContent(locale: Locale) {
    const detailContent = await this.sanityService.fetch(
      queryTransactionDetailContent(this.sanityService.getSanityLocale(locale)),
    );

    return detailContent?.[0] || {};
  }
}
