import { SanityBlockContent } from 'components/SanityBlockContent';
import { Container, Grid, GridColumn, Section } from 'components/Layout';

import styles from './NewsArticleDescription.module.scss';
import { Button } from 'components/Button';

interface Props {
  newsArticle: any;
  content: any;
}

const NewsArticleDescription: React.FC<Props> = ({ newsArticle, content }) => {
  const { newArticleSection } = newsArticle;
  const description = newArticleSection?.articleTextRichEditor || newArticleSection?.articleText;

  return (
    <Section
      as={'div'}
      size={'xl'}
      bg={'light'}
      color={'primary'}
      classes={styles.section}
    >
      <Container classes={styles.container}>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <GridColumn sm={12} md={6} lg={6} />
          <GridColumn sm={12} md={6} lg={6}>
            <div className={styles.description}>
              {Array.isArray(description) ? (
                <SanityBlockContent text={description} />
              ) : (
                description
              )}
            </div>
            <div className={styles.links}>
              {newArticleSection.links?.map((link) => (
                <Button
                  variant={'secondary'}
                  link={link.url}
                  
                >
                  {link.title}
                </Button>
              ))}
            </div>
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};

export default NewsArticleDescription;