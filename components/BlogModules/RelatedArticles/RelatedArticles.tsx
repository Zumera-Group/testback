import {
  Container,
  Grid,
  GridColumn,
  SwiperNavigationButtons,
} from 'components/Layout';
import styles from './RelatedArticles.module.scss';
import React, { useRef } from 'react';
import { SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { sanityImageUrlFor } from 'lib/sanity';
import { SwiperRelatedArticles } from 'components/Layout/SwiperRelatedArticles';
import { useFormatDate } from 'lib/shared-domain/useFormatDate';

const RelatedArticles: React.FC<{
  relatedArticles: any;
  blogArticleDetail: any;
}> = ({ relatedArticles, blogArticleDetail }) => {
  const swiperPrevRef = useRef();
  const swiperNextRef = useRef();
  const format = useFormatDate();
  const {
    relatedArticleSection: { raDesc, raTitle },
  } = blogArticleDetail;
  return (
    <Container classes={styles.relatedArticlesWrapper}>
      <Grid>
        <GridColumn xs={12} sm={6} md={6} lg={6}>
          <h2>{raTitle}</h2>
          <p className={styles.summary}>{raDesc}</p>
        </GridColumn>
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

      <SwiperRelatedArticles
        prevButton={swiperPrevRef}
        nextButton={swiperNextRef}
        classes={styles.carousel}
        maxSlidesToShow={2.15}
      >
        {relatedArticles?.map((article, index) => (
          <SwiperSlide
            key={`relatedArticleCarousel-${article._id}_${index}`}
            className={styles.slide}
          >
            <article className={styles.articleCard}>
              <div className={styles.thumbnail}>
                <Image
                  unoptimized
                  src={sanityImageUrlFor(article.heroImage?.asset?.url).url()}
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
            </article>
          </SwiperSlide>
        ))}
      </SwiperRelatedArticles>
    </Container>
  );
};

export default RelatedArticles;
