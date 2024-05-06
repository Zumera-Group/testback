import { Container, Grid, GridColumn, SwiperNavigationButtons } from 'components/Layout';
import styles from './RelatedArticles.module.scss';
import React, { useRef } from 'react';
import { SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { sanityImageUrlFor } from 'lib/sanity';
import { SwiperRelatedArticles } from 'components/Layout/SwiperRelatedArticles';
import { useFormatDate } from 'lib/shared-domain/useFormatDate';
import { useRouter } from 'next/router';
import { getBuiltLink } from 'lib/links';
import { Icon } from 'components/Icon';

const RelatedArticles: React.FC<{
  relatedArticles: any;
  relatedCalculators: any;
  blogArticleDetail: any;
}> = ({ relatedArticles, relatedCalculators = [], blogArticleDetail }) => {
  const swiperPrevRef = useRef();
  const swiperNextRef = useRef();
  const format = useFormatDate();
  const { locale } = useRouter();
  const {
    relatedArticleSection: { raDesc, raTitle },
  } = blogArticleDetail;

  const related = [...(relatedCalculators ?? []), ...relatedArticles];

  return (
    <Container classes={styles.relatedArticlesWrapper}>
      <Grid>
        <GridColumn xs={12} sm={6} md={6} lg={6}>
          <h2>{raTitle}</h2>
          <p className={styles.summary}>{raDesc}</p>
        </GridColumn>
      </Grid>

      <SwiperRelatedArticles
        prevButton={swiperPrevRef}
        nextButton={swiperNextRef}
        classes={styles.carousel}
        maxSlidesToShow={3}
      >
        {related?.map((article, index) => (
          <SwiperSlide
            key={`relatedArticleCarousel-${index}`}
            className={styles.slide}
          >
            <article className={styles.articleCard}>
              {article?._type === 'blogArticle' ? (
                <a
                  href={getBuiltLink({
                    locale,
                    path: 'blog',
                    uri: article?.slug?.current,
                  })}
                >
                  <div className={styles.thumbnail}>
                    <Image
                      unoptimized
                      src={sanityImageUrlFor(
                        article.heroImage?.asset?.url,
                      ).url()}
                      alt={article.heroImage?.alt}
                      width={410}
                      height={231}
                      style={{
                        maxWidth: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <span className={styles.date}>
                    {format(new Date(article?.date))}
                  </span>
                  <h5>{article?.articleTitle}</h5>
                  <p className={styles.summary}>{article?.summary}</p>
                  <div className={styles.categoryTags}>
                    {article.categories?.map((category) => (
                      <div key={category._id} className={styles.categoryTag}>
                        {category.title}
                      </div>
                    ))}
                  </div>
                </a>
              ) : (
                <GridColumn sm={12} md={6} lg={5} className={styles.rightColumn}>
                  <div className={styles.relatedCalculators}>
                    <a
                      href={getBuiltLink({
                        locale,
                        path: 'questionnaires',
                        uri: article.calculatorPage?.questionnaireSlug?.current,
                      })}
                    >
                      <h4 className={styles.heading}>{article.title}</h4>
                      <p className={styles.summary}>{article.description}</p>
                      <Icon
                        iconName={'arrow-circle'}
                        viewBox={'0 0 32 32'}
                        width={24}
                        height={24}
                      />
                    </a>
                  </div>
                </GridColumn>
              )}
            </article>
          </SwiperSlide>
        ))}
      </SwiperRelatedArticles>
      <Grid justifyContent="flex-end">
        <GridColumn
          xs={12}
          sm={6}
          md={6}
          lg={6}
          className={styles.navigationColumn}
        >
          <div className={styles.swiperButtons}>
            <SwiperNavigationButtons
              prev={swiperPrevRef}
              next={swiperNextRef}
            />
          </div>
        </GridColumn>
      </Grid>
    </Container>
  );
};

export default RelatedArticles;
