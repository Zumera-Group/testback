import React, { useEffect, useState } from 'react';

import { SiteSettings } from 'lib/shared-domain/page/domain';
import { BlogArticle } from 'lib/shared-domain/blogArticle/domain';
import { ErrorTrackingBoundary } from 'lib/ErrorTrackingBoundary';
import { SharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { useRouter } from 'next/router';
import { usePreviewSubscription } from '../../lib/sanity';

import { REVALIDATE_ON_FAILURE_TIME_IN_SECONDS } from '../../lib/shared-domain/page/constants';
import { SecretKeyLockScreen } from 'components/SecretKeyLockScreen';
import PageFooter from 'lib/shared-domain/page/presentation/PageFooter';
import { Section } from 'components/Layout';
import PageTransition from 'components/PageTransition';
import PageHeader from 'lib/shared-domain/page/presentation/PageHeader';
import { SEO } from 'components/SEO';
import { SanityService } from 'lib/services/sanity.service';
import { fetchPage } from 'lib/shared-domain/page/application/useGetPage';
import { ContentModuleType } from 'lib/shared-domain/page/domain/contentModule';
import Articles from 'components/BlogModules/Articles';
import ContactUsSection from 'lib/shared-domain/page/presentation/contentModules/ContactUsSection';

const PER_PAGE = 19;

export const queryBlogArticles = (lang, pageIndex, perPage) => `{
  "items": *[_type == "blogArticle" && _lang == "${lang}"] | order(_id) [(${pageIndex} * ${perPage})...(${pageIndex} + 1) * ${perPage}] {
    articleTitle,
    date,
    name,
    slug,
    _id,
    summary,
    heroImage {
      asset->{
        url
      },
    },
  },
  "total": count(*[_type == "blogArticle" && _lang == "${lang}"]),
}`;
export async function getStaticProps({ locale, params, preview = false }) {
  const sanrityService = new SanityService();
  const extraQuery = `
  featuredBlog->{
    heroImage {
      asset->{
        url
      },
    },
    _createdAt,
    summary,
    slug,
    name,
    date,
    articleTitle,
  },
  `;
  const data = await fetchPage(locale, 'blog', preview, extraQuery);
  const blogs = await sanrityService.fetch(
    queryBlogArticles(sanrityService.getSanityLocale(locale), 0, PER_PAGE),
  );

  const { page, query, siteSettings = {}, sharedContent } = data;
  const { featuredBlog }: any =
    page.contentModules.find((record) => record._type === 'blogIndexSection') ||
    {};
  const contentModules = page.contentModules.filter(
    (record) => record._type === 'blogIndexSection',
  );

  return {
    props: {
      siteSettings,
      sharedContent,
      blogs,
      page,
      featuredBlog,
      contentModules,
    },
    revalidate: REVALIDATE_ON_FAILURE_TIME_IN_SECONDS,
  };
}

interface Props {
  query: string;
  queryParams: string;
  selectedBlogArticle: BlogArticle;
  siteSettings: SiteSettings;
  sharedContent: any;
  blogDetailContent: any;
  contentModules: ContentModuleType;
  featuredBlog: any;
  blogs: any;
}

export default function Index({
  query,
  queryParams,
  selectedBlogArticle,
  siteSettings,
  sharedContent,
  featuredBlog,
  blogs,
}: Props): JSX.Element {
  const { data: previewData } = usePreviewSubscription(query, {
    params: { slug: queryParams } ?? {},
    initialData: selectedBlogArticle,
  });

  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);

  const [blogData, setBlogData] = useState({
    items: [],
    pageCount: Math.ceil(blogs.total / PER_PAGE),
    total: blogs.total,
  });

  const latestBlogs = blogs?.items.slice(0, 5) || [];
  const midGridArticles = blogs?.items.slice(5, 7) || [];
  const verticalGridArticles = blogs?.items.slice(7, 12) || [];
  const tripleGridArticles = blogs?.items.slice(12, 15) || [];
  const halfGridArticles = blogs?.items.slice(15, 19) || [];

  const router = useRouter();

  const [isSecretOpen, setIsSecretOpen] = useState(
    !siteSettings?.isUnderSecretKey,
  );
  useEffect(() => {
    if (localStorage.getItem('secretKeyOpen')) {
      setIsSecretOpen(true);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 600);
  }, [])

  if (router.isFallback) {
    return null;
  }

  if (siteSettings && siteSettings?.isUnderSecretKey && !isSecretOpen) {
    return <SecretKeyLockScreen siteSettings={siteSettings} />;
  }

  const fetchBlogPost = async (page) => {
    setLoading(true);
    const sanrityService = new SanityService();
    const blogRes = await sanrityService.fetch(
      queryBlogArticles(
        sanrityService.getSanityLocale(router.locale as any),
        page,
        PER_PAGE,
      ),
    );
    setPageIndex(page);
    setBlogData({
      ...blogData,
      ...blogRes,
    });
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <ErrorTrackingBoundary>
      <SharedContentContext value={sharedContent}>
        <main id="main">
          <SEO
            seoTitle={'Blog | Zumera'}
            seoDescription={'zumera'}
            siteSettings={siteSettings}
            // seoImage={blogArticle.heroImage}
          />
          <PageHeader contentModules={[]} siteSettings={siteSettings} whiteBg />
          <PageTransition slug={'blogArticle._id'}>
            <Section size={'md'} bg={'white'} color={'primary'} as="article">
              <Articles
                perPage={PER_PAGE}
                loading={loading}
                pageIndex={pageIndex}
                featuredBlog={featuredBlog}
                latestArticles={latestBlogs}
                midGridArticles={midGridArticles}
                verticalGridArticles={verticalGridArticles}
                tripleGridArticles={tripleGridArticles}
                halfGridArticles={halfGridArticles}
                handlePagination={async (value) => {
                  document.getElementById('main').scrollIntoView();
                  await fetchBlogPost(value);
                }}
                blog={blogData}
              />
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
      </SharedContentContext>
    </ErrorTrackingBoundary>
  );
}
