import React from 'react';
import { BlogArticle } from '../domain';
import { SiteSettings } from 'lib/shared-domain/page/domain';
import { PageFooter } from 'lib/shared-domain/page/presentation/PageFooter';
import { PageHeader } from 'lib/shared-domain/page/presentation/PageHeader';
import { ContentModule } from '../domain/blogModule';
import { getContentForContentModule } from './blogModules';
import { PageTransition } from 'components/PageTransition';
import { SEO } from 'components/SEO';
import { useFetchBlogArticles } from '../application/useGetBlogArticles';
import { links } from 'lib/links';
import { useRouter } from 'next/router';

export const BlogArticleLayout: React.FC<{
  blogArticle: BlogArticle;
  siteSettings: SiteSettings;
}> = ({ blogArticle, siteSettings }) => {
  //   const blogArticles = useFetchBlogArticles();

  //   const filteredNewsArticles = newsArticles.filter(
  //     (n) => n._id !== blogArticle._id,
  //   );
  const { locale } = useRouter();

  const otherLangSlug =
    blogArticle?.queryOtherLangSlug?.slice(-1)[0]?.slug &&
    links(locale === 'en' ? 'de' : 'en').newsArticles(
      blogArticle?.queryOtherLangSlug?.slice(-1)[0] as any,
    );
  const blogModules =
    blogArticle?.blogModules?.map((c) => ContentModule.create(c)) || [];

  console.log(blogArticle.blogModules);

  return (
    <main id="main">
      <SEO
        seoTitle={blogArticle.seoTitle}
        seoDescription={blogArticle.seoDescription}
        siteSettings={siteSettings}
        seoImage={blogArticle.heroImage}
      />
      <PageHeader
        contentModules={[]}
        siteSettings={siteSettings}
        otherLangSlug={otherLangSlug}
      />
      <PageTransition slug={blogArticle._id}>
        <h1>{blogArticle.articleTitle}</h1>
        {blogModules &&
          blogModules.map((c) => {
            return (
              <React.Fragment key={c._key}>
                {getContentForContentModule(
                  c,
                  {
                    ...siteSettings,
                  },
                  blogModules,
                )}
              </React.Fragment>
            );
          })}
      </PageTransition>
      <PageFooter siteSettings={siteSettings} />
    </main>
  );
};
