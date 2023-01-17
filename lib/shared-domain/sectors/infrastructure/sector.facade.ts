import { Locale } from 'lib/locale';
import { SanityService } from 'lib/services/sanity.service';
import { Sector } from '../../page/domain/index';
import {
  filterDataToSingleItem,
  getOtherLangSlugQuery,
} from '../../page/infrastructure/page.facade';
import { SERVER_FETCHING_ERROR } from '../../page/constants';

const querySectors = (lang) => `*[_type == "sector" && _lang == "${lang}"] {
  ...,
  _id,
  slug,
  _lang,
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
  },
  contributors[]-> {
    ...,
    firstName,
    lastName,
    picture {
      asset->{
        url
      },
    }
  },
  industries[]-> {
    ...,
  },
  report->{
    ...,
  },
  questionnaire->{
    questionnaireSlug {
      current
    },
  },
  mostPopularTransaction->{
    ...,
  },
  moreDetailsSection {
    ...,
    sectorMoreDetailsPicture {
      asset->{
        url
      },
    }
  },
  teamSection {
    ...,
    author->{
      firstName,
      lastName,
      jobTitle,
      mobile,
      phone,
      email,
      detailPagePicture {
        ...
        picture {
          asset->{
            url,
            type
          },
        }
      },
    }
  },
  transactionsTable {
    ...,
    mostPopularTransaction->{
      ...,
    }
  },
  industryReportSection {
    industryReport-> {
      ...,
      image {
        asset-> {
          url
        }
      }
    }
  },
}`;

const querySectorDetailContent = (
  lang,
) => `*[_type == "sectorDetailContent" && _lang == "${lang}"] {
  ...,
}`;

const querySectorDetail = (
  lang,
  slug,
  otherLangSlugQuery,
) => `*[_type == "sector" && slug.current == "${slug}" && _lang == "${lang}"] {
  ...,
  _id,
  _lang,
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
  },
  graphLight->{
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
  },
  detailPageHeroImage {
      asset->{
        url,
      }
  },
  industries[]-> {
    ...,
  },
  contributors[]-> {
    ...,
    firstName,
    lastName,
    picture {
      asset->{
        url
      },
    },
    cardPicture {
      ...
      picture {
        asset->{
          url,
          type
        },
      }
    },
  },
  calculatorTeaserSection {
    ...,
    questionnaire->{
      questionnaireSlug {
        current
      },
    },
  },
  transactionsTable {
    ...,
    mostPopularTransaction->{
      ...,
    }
  },
  report->{
    ...,
  },
  teamSection {
    ...,
    author->{
      firstName,
      lastName,
      jobTitle,
      mobile,
      phone,
      email,
      detailPagePicture {
        ...
        picture {
          asset->{
            url,
            type
          },
        }
      },
    }
  },
  moreDetailsSection {
    ...,
    sectorMoreDetailsPicture {
      asset->{
        url
      },
    }
  },
  futureTrendsSection {
    ...,
    trendsImage {
      asset-> {
        url
      }
    }
  },
  industryReportSection {
    industryReport-> {
      ...,
      image {
        asset-> {
          url
        }
      }
    }
  },
  "queryOtherLangSlug": ${otherLangSlugQuery},
}`;

export class SectorFacade {
  constructor(private readonly sanityService = new SanityService()) {}

  async getSectorDetail(
    lang: Locale,
    slug: string,
    preview?: boolean,
  ): Promise<{ sectorDetail: Sector; query: string }> {
    const query = querySectorDetail(
      this.sanityService.getSanityLocale(lang),
      slug,
      getOtherLangSlugQuery(lang, 'sector'),
    );
    const data = await this.sanityService.fetch(query, preview);
    if (!data) {
      throw new Error(SERVER_FETCHING_ERROR);
    }
    const sectorDetail = filterDataToSingleItem(data, preview);

    return { sectorDetail, query };
  }

  async getSectors(lang: Locale): Promise<Sector[]> {
    const sector = await this.sanityService.fetch(
      querySectors(this.sanityService.getSanityLocale(lang)),
    );

    return sector;
  }

  async getSectorDetailContent(lang: Locale): Promise<Sector[]> {
    const sector = await this.sanityService.fetch(
      querySectorDetailContent(this.sanityService.getSanityLocale(lang)),
    );
    return sector?.[0] || {};
  }
}
