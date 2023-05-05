import { Locale } from 'lib/locale';
import { SanityService } from 'lib/services/sanity.service';
import { BlogArticle } from '../domain';

import {
  filterDataToSingleItem,
  getOtherLangSlugQuery,
} from '../../page/infrastructure/page.facade';
import { SERVER_FETCHING_ERROR } from '../../page/constants';

const queryBlogArticle = (
  lang,
  slug,
  otherLangSlugQuery,
) => `*[_type == "blogArticle" && slug.current == "${slug}" && _lang == "${lang}"] {
  ...,
  _id,
  _lang,
 seoDescription,
 seoTitle,
  "queryOtherLangSlug": ${otherLangSlugQuery},
}`;

const queryBlogArticles = (
  lang,
) => `*[_type == "blogArticle" && _lang == "${lang}"] {
  ...,
  _id,
  _lang,
   seoDescription,
    seoTitle,
    articleTitle,
    name,
}
`;

// const queryNewsDetailContent = (
//   lang,
// ) => `*[_type == "newsArticleDetailContent" && _lang == "${lang}"] {
//   ...,
//     _id,
//   _lang,
//    seoDescription,
//     seoTitle,
//     articleTitle,
//     name,
// }`;

export class BlogArticleFacade {
  constructor(private readonly sanityService = new SanityService()) {}

  async getBlogArticle(
    lang: Locale,
    slug: string,
    preview?: boolean,
  ): Promise<{ blogArticle: BlogArticle; query: string }> {
    const query = queryBlogArticle(
      this.sanityService.getSanityLocale(lang),
      slug,
      getOtherLangSlugQuery(lang, 'blogArticle'),
    );
    const data = await this.sanityService.fetch(query, preview);
    if (!data) {
      throw new Error(SERVER_FETCHING_ERROR);
    }
    const blogArticle = filterDataToSingleItem(data, preview);

    return { blogArticle, query };
  }

  async getBlogArticles(lang: Locale): Promise<BlogArticle[]> {
    const blogArticles = await this.sanityService.fetch(
      queryBlogArticles(this.sanityService.getSanityLocale(lang)),
    );

    return blogArticles;
  }
}
