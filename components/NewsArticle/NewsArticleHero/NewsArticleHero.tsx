import Image from 'next/image';
import { Container, Grid, GridColumn, Section } from 'components/Layout';

import baseStyles from 'components/Hero/Hero.module.scss';
import { useFormatDate } from 'lib/shared-domain/useFormatDate';

import styles from './NewsArticleHero.module.scss';
import { sanityImageUrlFor } from 'lib/sanity';

interface Props {
  newsArticle: any;
}

const NewsArticleHero: React.FC<Props> = ({ newsArticle }) => {
  const format = useFormatDate();

  const dateFormatted = newsArticle.date
    ? format(new Date(newsArticle.date))
    : null;
  return (
    <Section
      as={'div'}
      classes={[baseStyles.hero, styles.hero].join(' ')}
      size={'lg'}
      bg={'light'}
      color={'primary'}
    >
      <Container classes={styles.heroContainer}>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <GridColumn sm={12} md={6} lg={6}>
            <span className={styles.date}>{dateFormatted}</span>
            <h4 className={styles.title}>{newsArticle.title}</h4>
            <p>{newsArticle.subtitle}</p>
          </GridColumn>
          <GridColumn sm={12} md={6} lg={6}>
            {newsArticle?.picture?.asset?.url && (
              <div className={styles.imageWrapper}>
                <Image
                  unoptimized
                  src={sanityImageUrlFor(
                    newsArticle?.picture?.asset?.url,
                  ).url()}
                  width={200}
                  height={1200}
                  alt={'name'}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    width: '100%',
                  }}
                />
              </div>
            )}
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};

export default NewsArticleHero;
