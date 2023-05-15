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
import Image from 'next/image';
import { sanityImageUrlFor } from 'lib/sanity';

import { RichText } from 'components/BlogModules/RichText';
import { SocialShare } from 'components/BlogModules/SocialShare';
import { AuthorBlock } from 'components/BlogModules/AuthorBlock';
import RelatedArticles from 'components/BlogModules/RelatedArticles/RelatedArticles';

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

  // console.log(blogArticle);

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

  return (
    <main id="main" className={styles.blogArticle}>
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
        <Section
          size={'md'}
          bg={'light'}
          color={'primary'}
          as="article"
          classes={styles.articleContent}
        >
          <Container classes={styles.introWrapper}>
            <Grid
              justifyContent={'space-between'}
              alignItems={'center'}
              fullWidth={true}
            >
              <GridColumn sm={12} md={6} lg={9}>
                <span>{dateFormatted}</span>
                <h1 className={styles.articleTitle}>
                  {blogArticle.articleTitle}
                </h1>
                <Grid
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  fullWidth={true}
                >
                  <GridColumn sm={12} md={12} lg={9}>
                    <p className={styles.summary}>{blogArticle.summary}</p>
                  </GridColumn>
                </Grid>
                <p className={styles.author}>
                  Written by{' '}
                  {blogArticle?.authors?.map((author, index) => (
                    <a
                      key={author._id}
                      href={
                        locale === 'en'
                          ? `/en/employees/${author?.slug?.current}`
                          : `/de/mitarbeiter/${author?.slug?.current}`
                      }
                      className={styles.authorLink}
                    >
                      {author?.firstName} {author?.lastName}
                      {index < blogArticle.authors.length - 1 && ', '}
                    </a>
                  ))}
                </p>
                <Grid
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  fullWidth={true}
                >
                  <GridColumn sm={12} md={6} lg={7}>
                    <SocialShare
                      content={blogArticle}
                      partialSlug="blog"
                      domain="https://www.zumera.com"
                    />
                  </GridColumn>
                  <GridColumn sm={12} md={6} lg={5}>
                    {/* <Button
                      variant={'secondary'}
                      link={'#'}
                      onDark={false}
                      classes={styles.downloadBtn}
                    >
                      Download this article
                    </Button> */}
                  </GridColumn>
                </Grid>
              </GridColumn>
              <GridColumn sm={12} md={6} lg={3}>
                <p>Anchor links</p>
              </GridColumn>
            </Grid>
          </Container>
          <Container classes={styles.heroWrapper}>
            <Image
              unoptimized
              src={sanityImageUrlFor(blogArticle?.heroImage?.asset?.url).url()}
              alt={blogArticle?.heroImage?.asset?.alt}
              width={1280}
              height={549}
              className={styles.heroImage}
            />
          </Container>
          <Container classes={[styles.introContentWrapper].join(' ')}>
            <div className={styles.innerOffset}>
              <Grid fullWidth={true} justifyContent={'space-between'}>
                <GridColumn sm={12} md={6} lg={8}>
                  <RichText content={blogArticle.introduction} />
                </GridColumn>
                <GridColumn
                  sm={12}
                  md={6}
                  lg={3}
                  className={styles.relatedListWrapper}
                >
                  <aside className={styles.relatedListInner}>
                    <span className={styles.relatedTitle}>
                      RELATED ARTICLES
                    </span>
                    <ol>
                      {blogArticle?.relatedArticles?.map((article) => (
                        <>
                          <li>
                            <a
                              key={article._id}
                              href={
                                locale === 'en'
                                  ? `/en/blog/${article?.slug?.current}`
                                  : `/de/blog/${article?.slug?.current}`
                              }
                            >
                              {article?.articleTitle}
                            </a>
                          </li>
                        </>
                      ))}
                    </ol>
                  </aside>
                </GridColumn>
              </Grid>
            </div>
          </Container>

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
          <AuthorBlock blogArticle={blogArticle} />
          <RelatedArticles relatedArticles={blogArticle.relatedArticles} />
        </Section>
      </PageTransition>
      <PageFooter siteSettings={siteSettings} />
    </main>
  );
};
export default BlogArticleLayout;
