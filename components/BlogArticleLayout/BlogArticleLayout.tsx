import React, { useState } from 'react';
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
// import { PortableText, sanityImageUrlFor } from 'lib/sanity';
import { PortableText } from '@portabletext/react';
import { Twitter } from 'components/Icons/Twitter';
import { Facebook } from 'components/Icons/Facebook';
import { Linkedin } from 'components/Icons/Linkedin';
import { Clipboard } from 'components/Icons/Clipboard';

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

  // console.log(blogArticle);
  const [copied, setCopied] = useState(false);
  const localeType = locale === 'en' ? 'en' : 'de';
  const protoDomain = 'https://www.zumera.com';
  const iframe = 'width=500,height=400';

  const handleTwitterClick = () => {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      blogArticle?.articleTitle,
    )}&url=${encodeURIComponent(
      `${protoDomain}/${localeType}/blog/${blogArticle?.slug?.current}`,
    )}`;
    window.open(shareUrl, '_blank', iframe);
  };

  const handleFacebookClick = () => {
    const shareUrl = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
      `${protoDomain}/${localeType}/blog/${blogArticle?.slug?.current}`,
    )}`;
    window.open(shareUrl, '_blank', iframe);
  };

  const handleLinkedinClick = () => {
    const shareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
      `${protoDomain}/${localeType}/blog/${blogArticle?.slug?.current}`,
    )}&title=${encodeURIComponent(blogArticle?.articleTitle)}`;
    window.open(shareUrl, '_blank', iframe);
  };

  const handleClipboardClick = () => {
    navigator.clipboard
      .writeText(
        `${protoDomain}/${localeType}/blog/${blogArticle?.slug?.current}`,
      )
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      });
  };

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
                  Written by <a href="#">Martin test</a>
                </p>
                <Grid
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  fullWidth={true}
                >
                  <GridColumn sm={12} md={6} lg={7}>
                    <div className={styles.socialIcons}>
                      <button
                        className={[styles.twitterShare, styles.shareIcon].join(
                          ' ',
                        )}
                        onClick={handleTwitterClick}
                      >
                        <Twitter />
                      </button>
                      <button
                        className={[
                          styles.facebookShare,
                          styles.shareIcon,
                        ].join(' ')}
                        onClick={handleFacebookClick}
                      >
                        <Facebook />
                      </button>
                      <button
                        className={[
                          styles.linkedinShare,
                          styles.shareIcon,
                        ].join(' ')}
                        onClick={handleLinkedinClick}
                      >
                        <Linkedin />
                      </button>
                      <button
                        className={[
                          styles.clipboardShare,
                          styles.shareIcon,
                        ].join(' ')}
                        onClick={handleClipboardClick}
                      >
                        <Clipboard />
                        {copied && (
                          <div className={styles.popup}>
                            {localeType === 'en' ? 'Copied!' : 'Kopiert!'}
                          </div>
                        )}
                      </button>
                    </div>
                  </GridColumn>
                  <GridColumn sm={12} md={6} lg={5}>
                    <Button
                      variant={'secondary'}
                      link={'#'}
                      onDark={false}
                      classes={styles.downloadBtn}
                    >
                      Download this article
                    </Button>
                  </GridColumn>
                </Grid>
              </GridColumn>
              <GridColumn sm={12} md={6} lg={3}>
                <p>Anchor links</p>
              </GridColumn>
            </Grid>
          </Container>
          <Container classes={styles.heroWrapper}>
            <img
              src={blogArticle?.heroImage?.asset?.url}
              alt={blogArticle?.heroImage?.asset?.alt}
              className={styles.heroImage}
            />
          </Container>
          <Container classes={[styles.introContentWrapper].join(' ')}>
            <div className={styles.innerOffset}>
              <Grid fullWidth={true} justifyContent={'space-between'}>
                <GridColumn sm={12} md={6} lg={8}>
                  <PortableText
                    value={blogArticle.introduction}
                    components={{
                      marks: {
                        internalLink: ({ value, children }) => {
                          const { slug = {}, type } = value;
                          const pageType = type === 'blogArticle' ? 'blog' : '';
                          const href = `/${localeType}/${pageType}/${slug?.current}`;
                          const target = (value?.href || '').startsWith('http')
                            ? '_blank'
                            : undefined;
                          return (
                            <a
                              href={href}
                              target={target}
                              rel={target === '_blank' && 'noindex nofollow'}
                            >
                              {children}
                            </a>
                          );
                        },
                      },
                    }}
                  />
                </GridColumn>
                <GridColumn sm={12} md={6} lg={3}>
                  RELATED ARTICLES
                  <ol>
                    <li>What is a family office and how does it work?</li>
                    <li>What is a family office and how does it work?</li>
                    <li>What is a family office and how does it work?</li>
                    <li>What is a family office and how does it work?</li>
                    <li>What is a family office and how does it work?</li>
                  </ol>
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
        </Section>

        {/* <Section
          size={'md'}
          bg={'light'}
          color={'primary'}
          as="article"
          classes={styles.articleContent}
        >
          <Container>
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
          </Container>
          <Container classes={styles.heroWrapper}>
            <img
              src={blogArticle?.heroImage?.asset?.url}
              alt={blogArticle?.heroImage?.asset?.alt}
              className={styles.heroImage}
            />
          </Container>
          <Container classes={styles.introWrapper}>
            <Grid fullWidth={true}>
              <GridColumn sm={12} md={7} lg={7} className={styles.offsetMargin}>
                <p className={styles.summary}>{blogArticle.summary}</p>
              </GridColumn>
            </Grid>
            <Grid fullWidth={true}>
              <GridColumn sm={12} md={7} lg={7} className={styles.offsetMargin}>
                <p className={styles.author}>
                  Written by <a href="#">Martin test</a>
                </p>
              </GridColumn>
            </Grid>
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
        </Section> */}
      </PageTransition>
      <PageFooter siteSettings={siteSettings} />
    </main>
  );
};
