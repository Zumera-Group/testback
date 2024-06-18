import {SanityService} from '../services/sanity.service';
import {ISanityDoc} from './page/domain';

/**
 * As a way of an improvement - fetch all docs in one query - pagination needs to be implemented.
 */
export class SitemapFacade {
  constructor(private readonly sanityService = new SanityService()) {}

  async getPagesWithLandings(): Promise<ISanityDoc[]> {
    return this.sanityService.fetch(`
*[
  _type in ["page", "landings"]
  && (hidePage == false || !defined(hidePage))
  && includeInSitemap == true
  && (defined(slug.current) && slug.current != '')
] {
  _id,
  _lang,
  _type,
  _langRefs[] -> {
    _id,
    _lang,
    slug,
    hidePage
  },
  __i18n_base -> {
    _id,
    _lang,
    slug,
    _langRefs[] -> {
      _id,
      _lang,
      slug,
      hidePage
    },
    hidePage
  },
  slug {
    current
  },
  _createdAt,
  _updatedAt
}
    `);
  }

  async getTransactionsServicesSectors(): Promise<ISanityDoc[]> {
    return this.sanityService.fetch(`
*[
  _type in ["transaction", "service", "sector"]
  && (hidePage == false || !defined(hidePage))
  && (defined(slug.current) && slug.current != '')
] {
  _id,
  _lang,
  _type,
  _langRefs[] -> {
    _id,
    _lang,
    slug,
    hidePage
  },
  __i18n_base -> {
    _id,
    _lang,
    slug,
    _langRefs[] -> {
      _id,
      _lang,
      slug,
      hidePage
    },
    hidePage
  },
  slug {
    current
  },
  _createdAt,
  _updatedAt
}
    `);
  }

  async getNewsAndEmployees(): Promise<ISanityDoc[]> {
    return this.sanityService.fetch(`
*[
  _type in ["newsArticle", "employee"]
  && (hidePage == false || !defined(hidePage))
  && (defined(slug.current) && slug.current != '')
] {
  _id,
  _lang,
  _type,
  _langRefs[] -> {
    _id,
    _lang,
    slug,
    hidePage
  },
  __i18n_base -> {
    _id,
    _lang,
    slug,
    _langRefs[] -> {
      _id,
      _lang,
      slug,
      hidePage
    },
    hidePage
  },
  slug {
    current
  },
  _createdAt,
  _updatedAt
}
    `);
  }

  async getBlogArticles(): Promise<ISanityDoc[]> {
    return this.sanityService.fetch(`
*[
  _type in ["blogArticle", "blogValToolArticle"]
  && (defined(slug.current) && slug.current != '')
] {
  _id,
  _lang,
  _type,
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
  slug {
    current
  },
  _createdAt,
  _updatedAt
}
    `);
  }

  async getQuestionnaires(): Promise<ISanityDoc[]> {
    return this.sanityService.fetch(`
*[
  _type == "valueCalculator"
  && (preventIndexing == false || !defined(preventIndexing))
  && (defined(questionnaireSlug.current) && questionnaireSlug.current != '')
] {
  _id,
  _lang,
  _type,
  _langRefs[] -> {
    _id,
    _lang,
    "slug": questionnaireSlug,
    "hidePage": preventIndexing
  },
  __i18n_base -> {
    _id,
    _lang,
    "slug": questionnaireSlug,
    "hidePage": preventIndexing,
    _langRefs[] -> {
      _id,
      _lang,
      "slug": questionnaireSlug,
      "hidePage": preventIndexing
    }
  },
  "slug": questionnaireSlug,
  _createdAt,
  _updatedAt
}
    `);
  }
}