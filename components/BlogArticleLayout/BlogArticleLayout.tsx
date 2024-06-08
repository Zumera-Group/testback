import React from 'react';
import { BlogArticle } from 'lib/shared-domain/blogArticle/domain';
import { SiteSettings } from 'lib/shared-domain/page/domain';
import { PageFooter } from 'lib/shared-domain/page/presentation/PageFooter';
import { PageHeader } from 'lib/shared-domain/page/presentation/PageHeader';
import { ContentModule } from 'lib/shared-domain/blogArticle/domain/blogModule';
import { getContentForContentModule } from 'lib/shared-domain/blogArticle/presentation/blogModules';
import { PageTransition } from 'components/PageTransition';
import { SEO } from 'components/SEO';
import { getBuiltLink } from 'lib/links';
import { useRouter } from 'next/router';
import { Container, Grid, GridColumn, Section } from 'components/Layout';
import styles from './BlogArticleLayout.module.scss';
import Image from 'next/image';
import { sanityImageUrlFor } from 'lib/sanity';

import { RichText } from 'components/BlogModules/RichText';
import { SocialShare } from 'components/BlogModules/SocialShare';
import RelatedArticles from 'components/BlogModules/RelatedArticles/RelatedArticles';
import ContactUsSection from 'lib/shared-domain/page/presentation/contentModules/ContactUsSection';
import useFormatDateLong from 'lib/shared-domain/useFormatDateLong';
import WhitePaperModal from 'components/BlogModules/WhitePaperModal/WhitePaperModal';
import { HiddenAnchor } from 'components/BlogModules/HiddenAnchor/HiddenAnchor';
import { stripSpacesFromString } from 'lib/stripSpacesFromString';

export const BlogArticleLayout: React.FC<{
  blogArticle: BlogArticle;
  siteSettings: SiteSettings;
  blogArticleDetail: any;
  querySlug: any;
}> = ({ blogArticle, siteSettings, blogArticleDetail }) => {
  const { locale } = useRouter();

  const blogModules =
    blogArticle?.blogModules?.map((c) => ContentModule.create(c)) || [];

  const dateFormatted = useFormatDateLong(blogArticle?.date);

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
        whiteBg
      />
      <PageTransition>
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
                      href={getBuiltLink({
                        locale,
                        path: 'employees',
                        uri: author?.slug?.current,
                      })}
                      className={styles.authorLink}
                    >
                      {author?.firstName} {author?.lastName}
                      {index < blogArticle.authors.length - 1 && ', '}
                    </a>
                  ))}
                </p>
                <div
                  className={styles.socialShareWrapper}
                >
                  <SocialShare
                    content={blogArticle}
                    partialSlug="blog"
                    domain={process.env.NEXT_PUBLIC_BASE_URL}
                  />
                  {blogArticle?.whitePaperDownload?.pdfURL && (
                    <WhitePaperModal
                      blogArticle={blogArticle}
                      siteSettings={siteSettings}
                      blogArticleDetail={blogArticleDetail}
                    />
                  )}
                </div>
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
                        <li key={section.anchor}>
                          <a href={`#${stripSpacesFromString(section.anchor)}`}>
                            {section?.title}
                          </a>
                        </li>
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

          <>
            <HiddenAnchor id={blogArticle.introAnchor} />
            <Container classes={[styles.introContentWrapper].join(' ')}>
              <div className={styles.innerOffset}>
                <Grid fullWidth={true} justifyContent={'space-between'}>
                  <GridColumn sm={12} md={12} lg={12}>
                    <RichText content={blogArticle.introduction} />
                  </GridColumn>
                </Grid>
              </div>
            </Container>
          </>

          {blogModules &&
            blogModules.map((c) => {
              return (
                <React.Fragment key={c._key}>
                  {getContentForContentModule(c, blogArticleDetail, blogArticle, siteSettings)}
                </React.Fragment>
              );
            })}
          {blogArticle.relatedArticles && (
            <RelatedArticles
              relatedArticles={blogArticle.relatedArticles}
              relatedCalculators={blogArticle.relatedCalculators}
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
