export interface BlogArticle {
  queryOtherLangSlug: {
    slug: { current: string };
  }[];
  _id: string;
  _lang: string;
  name: string;
  articleTitle: string;
  slug: { current: string };
  seoDescription: string;
  seoTitle: string;
}
