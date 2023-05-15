import React from 'react';
import { Container, Grid, GridColumn } from 'components/Layout';
import styles from './AuthorBlock.module.scss';
import { useRouter } from 'next/router';
import { Button } from 'components/Button';

export const AuthorBlock: React.FC<any> = ({ blogArticle }) => {
  const { locale } = useRouter();
  return (
    <Container classes={[styles.authorWrapper].join(' ')}>
      <div className={styles.innerOffset}>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <GridColumn sm={12} md={6} lg={8} className={styles.authorList}>
            <h4>The Author(s)</h4>
            <p className={styles.author}>
              Written by{' '}
              {blogArticle?.authors?.map((author, index) => (
                <>
                  {' '}
                  <a
                    key={author._id}
                    href={
                      locale === 'en'
                        ? `/en/employees/${author?.slug?.current}`
                        : `/de/mitarbeiter/${author?.slug?.current}`
                    }
                    className={styles.authorLink}
                  >
                    {author?.firstName} {author?.lastName}
                  </a>{' '}
                  {author?.email && (
                    <a href={`mailto:${author?.email}`}> ({author.email})</a>
                  )}
                  {index < blogArticle.authors.length - 1 && ', '}
                </>
              ))}{' '}
              who can be contacted directly for qualified interests.
            </p>
          </GridColumn>
          <GridColumn sm={12} md={6} lg={3}>
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
      </div>
    </Container>
  );
};

export default AuthorBlock;
