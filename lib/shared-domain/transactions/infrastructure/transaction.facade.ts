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
) => {
  //just for back compatibility
  let queryOtherLangSlug = '';
  if (otherLangSlugQuery) {
    queryOtherLangSlug = `"queryOtherLangSlug": ${otherLangSlugQuery},`
  }

  return `*[_type == "transaction" && slug.current == "${slug}" && _lang == "${lang}"] {
  ...,
  _id,
  _lang,
  _langRefs[] -> {
    _id,
    _lang,
    slug
  },
  __i18n_base -> {
    _id,
    _lang,
    slug,
    _langRefs[] -> {
      _id,
      _lang,
      slug
    }
  },
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
  ${queryOtherLangSlug}
}`;
}

const queryTransactions = (
  lang,
  sectors: null|string = null,
  orderBy: string = ''
): string => {
  if (!sectors) {
    sectors = `sectors[]-> {
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
    },`
  }

  return `*[_type == "transaction" && _lang == "${lang}" && (hidePage == false || !defined(hidePage))] {
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
    ${sectors}
    location-> {
      ...,
    },
    newsPressRelease-> {
      ...,
      slug {
        current
      }
    }
  }${orderBy}
  `;
}

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
      null
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

  async getLastTransactions(lang: Locale, limitIndex: number = 2): Promise<Transaction[]> {
    const sanityLang = this.sanityService.getSanityLocale(lang);

    const query = queryTransactions(sanityLang, null, `| order(date desc)[0..${limitIndex}]`);
    const transactions = await this.sanityService.fetch(query);

    return transactions;
  }

  async getTransactionsBySectorId(lang: Locale, sectorId: string): Promise<Transaction[]> {
    const sanityLang = this.sanityService.getSanityLocale(lang);
    const sectors = `"sectors": *[_type == "sector" && _lang == "${sanityLang}" && _id in ^.sectors[]._ref && id == "${sectorId}"] {
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
    },`;

    const query = queryTransactions(sanityLang, sectors, '[count(sectors) > 0 ] | order(date desc)[0..2]');
    const transactions = await this.sanityService.fetch(query);

    return transactions;
  }

  async getTransactionDetailContent(locale: Locale) {
    const detailContent = await this.sanityService.fetch(
      queryTransactionDetailContent(this.sanityService.getSanityLocale(locale)),
    );

    return detailContent?.[0] || {};
  }
}
