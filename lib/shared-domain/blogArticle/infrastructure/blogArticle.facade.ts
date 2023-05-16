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
 categories[]->{
   ...,
 },
  heroImage {
    ...,
    asset->{
      url
    },
  },
    introduction[] {
    ...,
    markDefs[] {
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug,
        "type": @.reference->_type,
        "lang": @.reference->_lang
      }
    }
  },
  authors[]-> {
    firstName,
    lastName,
    email,
    slug,
    _id,
  },
  relatedArticles[]-> {
    ...,
    articleTitle,
    slug,
    _id,
    date,
    categories[]->{
      ...,
    },
    heroImage {
      ...,
      asset->{
        url
      },
    },
  },
  blogModules[] {
       _key,
    _type,
    ...,
   text[] {
      ...,
        markDefs[] {
          ...,
          _type == "internalLink" => {
            "slug": @.reference->slug,
            "type": @.reference->_type,
            "lang": @.reference->_lang
          }
        }
    },
    image {
      ...,
      asset->{
        url
      },
    },
    imageSection {
      ...,
      image {
        ...,
        asset->{
          url
        },
      },
    },
   textSection[] {
    ...,
      text[] {
      ...,
        markDefs[] {
          ...,
          _type == "internalLink" => {
            "slug": @.reference->slug,
            "type": @.reference->_type,
            "lang": @.reference->_lang
          }
        }
      },
    },
    thumbnail {
      ...,
      asset->{
        url
      },
    } 
  },
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
  categories[]->{
   ...,
 },
  heroImage {
    ...,
    asset->{
      url
    },
  },
  introduction[] {
    ...,
    markDefs[] {
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug,
        "type": @.reference->_type,
        "lang": @.reference->_lang
      }
    }
  },
  authors[]-> {
    firstName,
    lastName,
    email,
    slug,
    _id
  },
  relatedArticles[]-> {
    ...,
    articleTitle,
    slug,
    _id,
    date,
    categories[]->{
      ...,
    },
     heroImage {
    ...,
    asset->{
        url
      },
    },
  },
  blogModules[] {
       _key,
    _type,
    ...,
   text[] {
      ...,
      markDefs[] {
        ...,
        _type == "internalLink" => {
           "slug": @.reference->slug,
          "type": @.reference->_type,
          "lang": @.reference->_lang
        }
      }
    },
    image {
      ...,
      asset->{
        url
      },
    },
    imageSection {
      ...,
      image {
        ...,
        asset->{
          url
        },
      },
    },
  textSection[] {
    ...,
      text[] {
      ...,
        markDefs[] {
          ...,
          _type == "internalLink" => {
            "slug": @.reference->slug,
            "type": @.reference->_type,
            "lang": @.reference->_lang
          }
        }
      },
    },
  thumbnail {
    ...,
      asset->{
        url
      },
    } 
  },
}
`;

const queryBlogDetailContent = (
  lang,
) => `*[_type == "blogDetailContent" && _lang == "${lang}"] {
  ...,
    calculatorCta{
    ...,
    calculatorPage[]->{
      questionnaireSlug
    }
  }
}`;

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

  async getBlogDetailContent(locale: Locale) {
    const detailContent = await this.sanityService.fetch(
      queryBlogDetailContent(this.sanityService.getSanityLocale(locale)),
    );

    return detailContent?.[0] || {};
  }
}
