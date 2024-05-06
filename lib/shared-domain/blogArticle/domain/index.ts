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
  categories: any[];
  authors: any[];
  seoDescription: string;
  seoTitle: string;
  heroImage: any;
  summary: string;
  introduction: any;
  introAnchor: string;
  whitePaperDownload: any;
  toc: any[];
  relatedArticles: any[];
  relatedCalculators: any[];
  blogModules: {
    _key: string;
    _type: ContentModuleType;
  }[];
}
