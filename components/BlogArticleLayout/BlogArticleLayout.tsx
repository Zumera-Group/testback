import React from 'react';
import { BlogArticle } from 'lib/shared-domain/blogArticle/domain';
import { SiteSettings } from 'lib/shared-domain/page/domain';
import { PageFooter } from 'lib/shared-domain/page/presentation/PageFooter';
import { PageHeader } from 'lib/shared-domain/page/presentation/PageHeader';
import { ContentModule } from 'lib/shared-domain/blogArticle/domain/blogModule';
import { getContentForContentModule } from 'lib/shared-domain/blogArticle/presentation/blogModules';
import { PageTransition } from 'components/PageTransition';
import { SEO } from 'components/SEO';
import { useFetchBlogArticles } from 'lib/shared-domain/blogArticle/application/useGetBlogArticles';
import { links } from 'lib/links';
import { useRouter } from 'next/router';
import { useFormatDate } from 'lib/shared-domain/useFormatDate';
import { Container, Grid, GridColumn, Section } from 'components/Layout';
import styles from './BlogArticleLayout.module.scss';
import { Button } from 'components/Button';

export const BlogArticleLayout: React.FC<{
  blogArticle: BlogArticle;
  siteSettings: SiteSettings;
}> = ({ blogArticle, siteSettings }) => {
  //   const blogArticles = useFetchBlogArticles();

  //   const filteredNewsArticles = newsArticles.filter(
  //     (n) => n._id !== blogArticle._id,
  //   );
  const { locale } = useRouter();
  const format = useFormatDate();

  const otherLangSlug =
    blogArticle?.queryOtherLangSlug?.slice(-1)[0]?.slug &&
    links(locale === 'en' ? 'de' : 'en').blogArticles(
      blogArticle?.queryOtherLangSlug?.slice(-1)[0] as any,
    );
  const blogModules =
    blogArticle?.blogModules?.map((c) => ContentModule.create(c)) || [];

  const dateFormatted = blogArticle?.date
    ? format(new Date(blogArticle?.date))
    : null;

  console.log(dateFormatted);

  return (
    <main id="main" className={styles.blogArticleTemplate}>
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
        <Section size={'md'} bg={'light'} color={'primary'}>
          <Container classes={styles.titleWrapperOuter}>
            <div className={styles.titleWrapperInner}>
              <Grid
                justifyContent={'space-between'}
                alignItems={'start'}
                fullWidth={true}
              >
                <GridColumn sm={12} md={6} lg={6}>
                  <span>{dateFormatted}</span>
                </GridColumn>
              </Grid>
              <Grid
                justifyContent={'space-between'}
                alignItems={'end'}
                fullWidth={true}
              >
                <GridColumn sm={12} md={6} lg={7}>
                  <h1 className={styles.articleTitle}>
                    {blogArticle.articleTitle}
                  </h1>
                </GridColumn>
                <GridColumn sm={12} md={6} lg={3}>
                  <Button
                    variant={'secondary'}
                    link={'#'}
                    onDark={false}
                    classes={styles.downloadBtn}
                  >
                    {'Download this article'}
                  </Button>
                </GridColumn>
              </Grid>
            </div>
          </Container>
        </Section>

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
