import { ContentModuleType } from './blogModule';
import {I18nBase, ILangRef} from "../../../../@types/i18n";

interface TableOfContentItem {
  title: string;
  anchor: string;
}

export interface IBlogModule {
  _key: string;
  _type: ContentModuleType;
  image?: {
    _type: string;
    asset?: {
      url?: string;
    }
  }
}

export interface IBlogAuthor {
  _id: string;
  calendlyURL?: string|null;
  email?: string|null;
  firstName?: string|null;
  lastName?: string|null;
  slug?: {
    type?: string;
    current?: string
  }
}

export enum TBlogArticleType {
  blogArticle = 'blogArticle',
  blogValToolArticle = 'blogValToolArticle',
}

export interface BlogArticle {
  queryOtherLangSlug: {
    slug: { current: string };
  }[];
  _id: string;
  _lang: string;
  _langRefs?: ILangRef[];
  __i18n_base?: I18nBase;
  _type: TBlogArticleType;
  name: string;
  date: any;
  articleTitle: string;
  slug: { current: string };
  categories: any[];
  authors?: IBlogAuthor[];
  seoDescription: string;
  seoTitle: string;
  heroImage: any;
  summary: string;
  introduction: any;
  introAnchor: string;
  whitePaperDownload: any;
  toc: TableOfContentItem[];
  relatedArticles: any[];
  relatedCalculators: any[];
  blogModules?: IBlogModule[]|null;
  _updatedAt?: string;
}
