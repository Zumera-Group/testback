import React from 'react';
import { BlogArticle } from 'lib/shared-domain/blogArticle/domain';
import { SiteSettings } from 'lib/shared-domain/page/domain';
import { PageFooter } from 'lib/shared-domain/page/presentation/PageFooter';
import { PageHeader } from 'lib/shared-domain/page/presentation/PageHeader';
import { ContentModule } from 'lib/shared-domain/blogArticle/domain/blogModule';
import { getContentForContentModule } from 'lib/shared-domain/blogArticle/presentation/blogModules';
import { PageTransition } from 'components/PageTransition';
import { SEO } from 'components/SEO';
import { links } from 'lib/links';
import { useRouter } from 'next/router';
import { Container, Grid, GridColumn, Section } from 'components/Layout';
import styles from './BlogArticleLayout.module.scss';
import Image from 'next/image';
import { sanityImageUrlFor } from 'lib/sanity';

import { RichText } from 'components/BlogModules/RichText';
import { SocialShare } from 'components/BlogModules/SocialShare';
import { AuthorBlock } from 'components/BlogModules/AuthorBlock';
import RelatedArticles from 'components/BlogModules/RelatedArticles/RelatedArticles';
import ContactUsSection from 'lib/shared-domain/page/presentation/contentModules/ContactUsSection';
import useFormatDateLong from 'lib/shared-domain/useFormatDateLong';
import WhitePaperModal from 'components/BlogModules/WhitePaperModal/WhitePaperModal';

export const BlogArticleLayout: React.FC<{
  blogArticle: BlogArticle;
  siteSettings: SiteSettings;
  blogArticleDetail: any;
  querySlug: any;
}> = ({ blogArticle, siteSettings, blogArticleDetail, querySlug }) => {
  const { locale } = useRouter();

  const blogModules =
    blogArticle?.blogModules?.map((c) => ContentModule.create(c)) || [];

  const dateFormatted = useFormatDateLong(blogArticle?.date);

  console.log(blogArticle?.whitePaperDownload);

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
        otherLangSlug={querySlug}
        whiteBg
      />
      <PageTransition slug={blogArticle._id}>
        <Section
          size={'md'}
          bg={'white'}
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
                  {blogArticleDetail.writtenByLabel}{' '}
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
                      domain={process.env.NEXT_PUBLIC_BASE_URL}
                    />
                  </GridColumn>
                  <GridColumn sm={12} md={6} lg={5}>
                    {blogArticle?.whitePaperDownload?.pdfURL && (
                      <WhitePaperModal
                        blogArticle={blogArticle}
                        siteSettings={siteSettings}
                        blogArticleDetail={blogArticleDetail}
                      />
                    )}
                  </GridColumn>
                </Grid>
              </GridColumn>
              <GridColumn
                sm={12}
                md={6}
                lg={3}
                className={styles.tocListWrapper}
              >
                {blogArticle.toc && (
                  <aside className={styles.tocInner}>
                    <span className={styles.tocTitle}>
                      {blogArticleDetail.tocTitle}
                    </span>
                    <ol>
                      {blogArticle?.toc?.map((section) => (
                        <>
                          <li>
                            <a key={section._id} href={`#${section.anchor}`}>
                              {section?.title}
                            </a>
                          </li>
                        </>
                      ))}
                    </ol>
                  </aside>
                )}
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
          <Container
            classes={[styles.introContentWrapper].join(' ')}
            id={blogArticle.introAnchor}
          >
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
                  {/* UPDATE TYPE HERE TO GET THE VALUE CALC ARTICLES */}
                  {blogArticle.relatedArticles && (
                    <aside className={styles.relatedListInner}>
                      <span className={styles.relatedTitle}>
                        {blogArticleDetail.relatedArticleSection.raTitle}
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
                  )}
                </GridColumn>
              </Grid>
            </div>
          </Container>

          {blogModules &&
            blogModules.map((c) => {
              return (
                <React.Fragment key={c._key}>
                  {getContentForContentModule(c, blogArticleDetail)}
                </React.Fragment>
              );
            })}
          <AuthorBlock
            blogArticle={blogArticle}
            blogArticleDetail={blogArticleDetail}
            key={blogArticle._id}
          />
          {blogArticle.relatedArticles && (
            <RelatedArticles
              relatedArticles={blogArticle.relatedArticles}
              blogArticleDetail={blogArticleDetail}
            />
          )}
        </Section>
      </PageTransition>
      <div id="contactForm">
        <ContactUsSection
          specificContentModule={null}
          content={siteSettings.contactSectionContent}
        />
      </div>

      <PageFooter siteSettings={siteSettings} />
    </main>
  );
};
export default BlogArticleLayout;
