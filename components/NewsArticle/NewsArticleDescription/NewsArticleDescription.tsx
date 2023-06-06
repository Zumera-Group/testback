import { SanityBlockContent } from 'components/SanityBlockContent';
import { Container, Grid, GridColumn, Section } from 'components/Layout';

import styles from './NewsArticleDescription.module.scss';
import { Button } from 'components/Button';
import Image from 'next/image';
import { sanityImageUrlFor } from 'lib/sanity';

interface Props {
  newsArticle: any;
  content: any;
}

const NewsArticleDescription: React.FC<Props> = ({ newsArticle, content }) => {
  const { newArticleSection, secondPicture } = newsArticle;
  const description =
    newArticleSection?.articleTextRichEditor || newArticleSection?.articleText;

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
          alignItems={'end'}
          className={styles.contentWrapper}
        >
          <GridColumn sm={12} md={6} lg={6}>
            {secondPicture?.asset?.url && (
              <div className={styles.imageWrapper}>
                <Image
                  unoptimized
                  src={sanityImageUrlFor(secondPicture.asset?.url).url()}
                  width={200}
                  height={1200}
                  alt={secondPicture.asset?.alt}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    width: '75%',
                    display: 'block',
                    margin: 'auto',
                  }}
                />
              </div>
            )}
          </GridColumn>
          <GridColumn sm={12} md={6} lg={6}>
            <div className={styles.description}>
              {Array.isArray(description) ? (
                <SanityBlockContent text={description} />
              ) : (
                description
              )}
            </div>
            <div className={styles.links}>
              {newArticleSection &&
                newArticleSection.links?.map((link, i) => (
                  <Button
                    variant={'secondary'}
                    link={link.url}
                    key={`article-link-${i}`}
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
