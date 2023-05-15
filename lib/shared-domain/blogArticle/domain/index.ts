import { ContentModuleType } from './blogModule';

export interface BlogArticle {
  queryOtherLangSlug: {
    slug: { current: string };
  }[];
  _id: string;
  _lang: string;
  name: string;
  date: any;
  articleTitle: string;
  slug: { current: string };
  authors: any[];
  seoDescription: string;
  seoTitle: string;
  heroImage: any;
  summary: string;
  introduction: any;
  relatedArticles: any[];
  blogModules: {
    _key: string;
    _type: ContentModuleType;
  }[];
}
