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
  seoDescription: string;
  seoTitle: string;
  heroImage: any;
  blogModules: {
    _key: string;
    _type: ContentModuleType;
  }[];
}
