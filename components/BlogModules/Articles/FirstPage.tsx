import { useRouter } from 'next/router';

import { Container, Grid, GridColumn } from 'components/Layout';
import { Icon } from 'components/Icon';

import ArticleBox from '../ArticleBox';

import styles from './Articles.module.scss';
import Pagination from './Pagination';

interface Props {
  featuredBlog: any;
  latestArticles: any[];
  midGridArticles: any[];
  verticalGridArticles: any[];
  tripleGridArticles: any[];
  halfGridArticles: any[];
  blogDetailContent: any;
}

const FirstPage: React.FC<Props> = ({
  featuredBlog,
  latestArticles,
  midGridArticles,
  verticalGridArticles,
  tripleGridArticles,
  halfGridArticles,
  blogDetailContent,
}) => {
  const { locale } = useRouter();
  const {
    calculatorCta: { calculatorPage, description, title },
  } = blogDetailContent;

  return (
    <div className={styles.root}>
      <Container classes={styles.container}>
        <Grid justifyContent={'space-between'} fullWidth={true}>
          <GridColumn sm={12} md={8} lg={8}>
            <span className={styles.secitionTitle}>
              {blogDetailContent?.blogIndexContent?.featuredArticle}
            </span>
            <ArticleBox
              titleEl="h3"
              item={featuredBlog || {}}
              type="featured"
            />
          </GridColumn>
          <GridColumn sm={12} md={4} lg={4}>
            <span className={styles.secitionTitle}>
              {blogDetailContent?.blogIndexContent?.latestArticles}
            </span>
            {latestArticles?.map((article) => (
              <ArticleBox
                titleEl="h5"
                item={article || {}}
                type="latest"
                key={article.id}
              />
            ))}
          </GridColumn>
        </Grid>
      </Container>
      {midGridArticles && !!midGridArticles.length && (
        <Container classes={styles.container}>
          <Grid justifyContent={'space-between'} fullWidth={true}>
            {midGridArticles?.map((article) => (
              <GridColumn sm={12} md={4} lg={4} key={article.id}>
                <ArticleBox titleEl="h5" item={article || {}} type="standard" />
              </GridColumn>
            ))}
            <GridColumn sm={12} md={4} lg={4}>
              <a
                className={styles.cta}
                href={
                  locale === 'en'
                    ? `/en/questionnaires/${calculatorPage[0]?.questionnaireSlug?.current}`
                    : `/de/fragenkatalog/${calculatorPage[0]?.questionnaireSlug?.current}`
                }
              >
                <div>
                  <h4>{title}</h4>
                  <p>{description}</p>
                </div>

                <Icon
                  iconName={'arrow-circle'}
                  viewBox={'0 0 32 32'}
                  width={24}
                  height={24}
                />
              </a>
            </GridColumn>
          </Grid>
        </Container>
      )}
      {verticalGridArticles && !!verticalGridArticles.length && (
        <Container classes={styles.container}>
          <Grid justifyContent={'space-between'} fullWidth={true}>
            <GridColumn sm={12} md={12} lg={6}>
              <ArticleBox
                titleEl="h4"
                item={verticalGridArticles[0] || {}}
                type="vertical"
              />
            </GridColumn>
            <GridColumn sm={12} md={12} lg={6}>
              <Grid
                justifyContent={'space-between'}
                fullWidth={true}
                className={styles.veritcalGrid}
              >
                {verticalGridArticles
                  .filter((_, index) => index !== 0)
                  .map((article, i) => (
                    <GridColumn sm={12} md={6} lg={6} key={article.id}>
                      <ArticleBox
                        titleEl="strong"
                        item={article}
                        type="small-vertical"
                        hasDivider={i <= 1}
                      />
                    </GridColumn>
                  ))}
              </Grid>
            </GridColumn>
          </Grid>
        </Container>
      )}
      {tripleGridArticles && !!tripleGridArticles.length && (
        <Container classes={styles.container}>
          <Grid justifyContent={'space-between'} fullWidth={true}>
            {tripleGridArticles.map((article, i) => (
              <GridColumn
                sm={12}
                md={i === 0 ? 6 : 3}
                lg={i === 0 ? 6 : 3}
                key={article.id}
              >
                <ArticleBox
                  titleEl={i === 0 ? 'h4' : 'h5'}
                  item={article}
                  type="standard"
                />
              </GridColumn>
            ))}
          </Grid>
        </Container>
      )}
      {halfGridArticles && !!halfGridArticles.length && (
        <Container classes={styles.container}>
          <Grid justifyContent={'space-between'} fullWidth={true}>
            {halfGridArticles.map((article) => (
              <GridColumn sm={12} md={6} lg={6} key={article.id}>
                <ArticleBox titleEl="h5" item={article} type="half-vertical" />
              </GridColumn>
            ))}
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default FirstPage;
