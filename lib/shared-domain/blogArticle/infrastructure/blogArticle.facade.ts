import { Locale } from 'lib/locale';
import { SanityService } from 'lib/services/sanity.service';
import { BlogArticle } from '../domain';
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
 seoDescription,
 seoTitle
  "queryOtherLangSlug": ${otherLangSlugQuery},
}`;

const queryNewsArticles = (
  lang,
) => `*[_type == "newsArticle" && _lang == "${lang}"] {
  ...,
  _id,
  _lang,
   seoDescription,
    seoTitle
`;

const queryNewsDetailContent = (
  lang,
) => `*[_type == "newsArticleDetailContent" && _lang == "${lang}"] {
  ...,
}`;

// export class NewsArticleFacade {
//   constructor(private readonly sanityService = new SanityService()) {}

//   async getNewsArticle(
//     lang: Locale,
//     slug: string,
//     preview?: boolean,
//   ): Promise<{ newsArticle: BlogArticle; query: string }> {
//     const query = queryNewsArticle(
//       this.sanityService.getSanityLocale(lang),
//       slug,
//       getOtherLangSlugQuery(lang, 'newsArticle'),
//     );
//     const data = await this.sanityService.fetch(query, preview);
//     if (!data) {
//       throw new Error(SERVER_FETCHING_ERROR);
//     }
//     const newsArticle = filterDataToSingleItem(data, preview);

//     return { newsArticle, query };
//   }

//   async getNewsArticles(lang: Locale): Promise<BlogArticle[]> {
//     const newsArticles = await this.sanityService.fetch(
//       queryNewsArticles(this.sanityService.getSanityLocale(lang)),
//     );

//     return newsArticles;
//   }

//   async getDetailContent(locale: Locale) {
//     const detailContent = await this.sanityService.fetch(
//       queryNewsDetailContent(this.sanityService.getSanityLocale(locale)),
//     );

//     return detailContent?.[0] || {};
//   }
// }
