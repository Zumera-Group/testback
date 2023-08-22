import { Container, Grid, GridColumn } from 'components/Layout';

import ArticleBox from '../ArticleBox';

import styles from './Articles.module.scss';
import Pagination from './Pagination';
import FirstPage from './FirstPage';
import { useRouter } from 'next/router';
import { getArticlePaginationInfo } from 'lib/links';

interface Props {
  featuredBlog: any;
  latestArticles: any[];
  midGridArticles: any[];
  verticalGridArticles: any[];
  tripleGridArticles: any[];
  halfGridArticles: any[];
  blogDetailContent: any;
  handlePagination: (value: string) => void;
  blog: any;
  pageIndex: number;
  loading: boolean;
  perPage?: number;
}

const Articles: React.FC<Props> = ({
  featuredBlog,
  latestArticles = [],
  midGridArticles = [],
  verticalGridArticles = [],
  tripleGridArticles = [],
  halfGridArticles = [],
  handlePagination,
  pageIndex,
  blog,
  loading,
  perPage,
  blogDetailContent,
}) => {
  const startArticle = pageIndex * perPage + 1;
  const endArticle = Math.min((pageIndex + 1) * perPage, blog.total);
  const { locale } = useRouter();

  const result = getArticlePaginationInfo({
    total: blog.total,
    startArticle,
    endArticle,
    locale,
  });

  return (
    <div className={styles.root}>
      <Container classes={styles.infoContainer}>
        <Grid
          justifyContent={'space-between'}
          alignItems="end"
          fullWidth={true}
        >
          <GridColumn sm={12} md={8} lg={8}>
            <h2>{blogDetailContent?.blogIndexContent?.heading}</h2>
            <p>{result}</p>
          </GridColumn>
          <GridColumn sm={12} md={4} lg={4}></GridColumn>
        </Grid>
      </Container>
      {loading && (
        <div className={styles.loading}>
          <Container classes={styles.infoContainer}>
            <Grid
              justifyContent={'space-between'}
              alignItems="end"
              fullWidth={true}
            >
              {[...Array.from({ length: 18 })].map((_, index) => (
                <GridColumn sm={12} md={4} lg={4} key={index}>
                  <div className={styles.animation}>
                    <div className={styles.animatedImage} />
                    <div className={styles.animationTitle} />
                    <div className={styles.animationTitle2} />
                    <div className={styles.animationDesc} />
                    <div className={styles.animationDesc2} />
                    <div className={styles.animationDesc3} />
                  </div>
                </GridColumn>
              ))}
            </Grid>
          </Container>
        </div>
      )}
      <div>
        {pageIndex === 0 ? (
          <FirstPage
            featuredBlog={featuredBlog}
            latestArticles={latestArticles}
            midGridArticles={midGridArticles}
            verticalGridArticles={verticalGridArticles}
            tripleGridArticles={tripleGridArticles}
            halfGridArticles={halfGridArticles}
            blogDetailContent={blogDetailContent}
          />
        ) : (
          <Container classes={styles.container}>
            <Grid fullWidth={true}>
              {blog.items.map((article, i) => (
                <GridColumn
                  sm={12}
                  md={6}
                  lg={4}
                  key={article.id}
                  className={styles.otherPageItem}
                >
                  <ArticleBox titleEl={'h5'} item={article} type="standard" />
                </GridColumn>
              ))}
            </Grid>
          </Container>
        )}
      </div>
      <Pagination
        itemsPerPage={perPage}
        handlePagination={handlePagination}
        pageCount={blog.pageCount}
      />
    </div>
  );
};

export default Articles;
