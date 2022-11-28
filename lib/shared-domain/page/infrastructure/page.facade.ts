import { Locale } from 'lib/locale';
import { SanityService } from 'lib/services/sanity.service';
import { Page } from '../domain';
import { querySiteSettings } from './siteSettings.facade';
import { SiteSettings } from '../domain/index';
import { querySharedContent } from './sharedContent.facade';
import { contentModulesQuery } from './contentModulesQuery';
import { SERVER_FETCHING_ERROR } from '../constants';

const queryPage = (
  lang,
  slug,
  otherLangSlugQuery,
  querySiteSettings,
  querySharedContent,
) => `*[_type == "page" && _lang == "${lang}" && slug.current == "${slug}"] {
  ...,
  _id,
  _lang,
  slug {
    current
  },
  seoImage {
    asset->{
      url
    }
  },
  ${contentModulesQuery()},
  "queryOtherLangSlug": ${otherLangSlugQuery},
  "querySiteSettings": ${querySiteSettings},
  "querySharedContent": ${querySharedContent}
}`;

const queryPages = () => `*[_type == "page"] {
  _id,
  _lang,
  slug {
    current
  },
  disallowInRobotsTxt,
  includeInSitemap
}`;

export function filterDataToSingleItem(data, preview) {
  if (!Array.isArray(data)) return data;

  return data?.length > 1 && preview
    ? data?.filter((item) => item._id.startsWith(`drafts.`))?.slice(-1)?.[0]
    : data?.slice(-1)[0];
}

export const getOtherLangSlugQuery = (lang: Locale, type: string) =>
  lang === 'de'
    ? "*[_type=='" +
      type +
      "' && _id + '__i18n_de' == ^._id]{ slug { current } }"
    : "*[_type=='" +
      type +
      "' && _id == ^._id + '__i18n_de']{ slug { current } }";

export class PageFacade {
  constructor(private readonly sanityService = new SanityService()) {}

  async getPage(
    lang: Locale,
    slug: string,
    preview?: boolean,
  ): Promise<{
    page: Page;
    query: string;
    siteSettings: SiteSettings;
    sharedContent: any;
  }> {
    const query = queryPage(
      this.sanityService.getSanityLocale(lang),
      slug,
      getOtherLangSlugQuery(lang, 'page'),
      querySiteSettings(this.sanityService.getSanityLocale(lang)),
      querySharedContent(this.sanityService.getSanityLocale(lang)),
    );

    const data = await this.sanityService.fetch(query, preview);

    if (!data) {
      throw new Error(SERVER_FETCHING_ERROR);
    }

    const page = filterDataToSingleItem(data, preview);
    const siteSettings = page?.querySiteSettings;
    const sharedContent = page?.querySharedContent;

    return { page, query, siteSettings, sharedContent };
  }

  async getPages(): Promise<Page[]> {
    const pages = await this.sanityService.fetch(queryPages());

    return pages;
  }
}
