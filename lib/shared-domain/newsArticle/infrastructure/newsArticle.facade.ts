import { Locale } from 'lib/locale';
import { SanityService } from 'lib/services/sanity.service';
import { NewsArticle } from '../domain';
import {
  filterDataToSingleItem,
  getOtherLangSlugQuery,
} from '../../page/infrastructure/page.facade';
import { SERVER_FETCHING_ERROR } from '../../page/constants';

const queryNewsArticle = (
  lang,
  slug,
  otherLangSlugQuery,
) => `*[_type == "newsArticle" && slug.current == "${slug}" && _lang == "${lang}"] {
  ...,
  _id,
  _lang,
  picture {
    asset->{
      url
    },
  },
  secondPicture {
    asset->{
      url
    },
  },
  team[]-> {
    ...,
    firstName,
    lastName,
    picture {
      asset->{
        url
      },
    },
    cardPicture {
      ...,
      picture {
        asset->{
          url
        },
      }
    },
  },
  reportDownloadSection {
    ...,
    report->{
      ...,
    },
  },
  eventPartnerRefereesSection[]{
    ...,
    partners[] {
      ...,
      picture {
        asset->{
          url
        },
      },
      logo {
        asset->{
          url
        },
      },
    }
  },
  eventRefereesSection[]-> {
    ...,
    firstName,
    lastName,
    picture {
      asset->{
        url
      },
    },
    cardPicture {
      ...,
      picture {
        asset->{
          url
        },
      }
    },
  },
  programSection[]{
    ...,
    program[]{
      startHourTime,
      startMinTime,
      title,
      description,
      speaker,
      logo {
        asset->{
          url
        },
      }
    }
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
  office->{
    ...,
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

const queryNewsArticles = (
  lang,
) => `*[_type == "newsArticle" && _lang == "${lang}"] {
  ...,
  _id,
  _lang,
  newsGridWithAdditionalPaddingForImage,
  pictureImageFit,
  picture {
    asset->{
      url
    },
  },
  secondPicture {
    asset->{
      url
    },
  },
  report->{
    ...,
  },
  team[]-> {
    ...,
    firstName,
    lastName,
    picture {
      asset->{
        url
      },
    }
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
  office->{
    ...,
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

const queryNewsDetailContent = (
  lang,
) => `*[_type == "newsArticleDetailContent" && _lang == "${lang}"] {
  ...,
}`;

export class NewsArticleFacade {
  constructor(private readonly sanityService = new SanityService()) {}

  async getNewsArticle(
    lang: Locale,
    slug: string,
    preview?: boolean,
  ): Promise<{ newsArticle: NewsArticle; query: string }> {
    const query = queryNewsArticle(
      this.sanityService.getSanityLocale(lang),
      slug,
      getOtherLangSlugQuery(lang, 'newsArticle'),
    );
    const data = await this.sanityService.fetch(query, preview);
    if (!data) {
      throw new Error(SERVER_FETCHING_ERROR);
    }
    const newsArticle = filterDataToSingleItem(data, preview);

    return { newsArticle, query };
  }

  async getNewsArticles(lang: Locale): Promise<NewsArticle[]> {
    const newsArticles = await this.sanityService.fetch(
      queryNewsArticles(this.sanityService.getSanityLocale(lang)),
    );

    return newsArticles;
  }

  async getDetailContent(locale: Locale) {
    const detailContent = await this.sanityService.fetch(
      queryNewsDetailContent(this.sanityService.getSanityLocale(locale)),
    );

    return detailContent?.[0] || {};
  }
}
