import React, { useEffect, useRef } from 'react';
import { Container, Grid, GridColumn } from 'components/Layout';
import styles from './AuthorBlock.module.scss';
import { useRouter } from 'next/router';
import { Button } from 'components/Button';
import { RichText } from '../RichText';
import { Icon } from 'components/Icon';
import WhitePaperModal from '../WhitePaperModal/WhitePaperModal';

export const AuthorBlock: React.FC<any> = ({
  blogArticle,
  blogArticleDetail,
  siteSettings,
}) => {
  const { locale } = useRouter();
  const spanRef = useRef(null);

  useEffect(() => {
    spanRef.current.innerHTML = spanRef?.current?.firstElementChild?.innerHTML;
  }, []);

  const {
    calculatorCta: { calculatorPage, description, title },
    calendlyCTA,
  } = blogArticleDetail;

  const closeCalendly = () => {
    const calendly = document.querySelector('.calendly-overlay');
    if (calendly) {
      calendly.removeEventListener('click', closeCalendly);
    }
    window.Calendly.closePopupWidget();
  };

  return (
    <Container classes={[styles.authorWrapper].join(' ')} key={blogArticle._id}>
      <div className={styles.innerOffset}>
        <Grid fullWidth={true} justifyContent={'space-between'}>
          <GridColumn sm={12} md={6} lg={6} className={styles.leftColumn}>
            <div className={styles.authorList}>
              <h4>{blogArticleDetail.authorSection.authorTitle}</h4>
              <p className={styles.author}>
                {blogArticleDetail.writtenByLabel}{' '}
                {blogArticle?.authors?.map((author, index) => (
                  <>
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
                    </a>
                    {index < blogArticle.authors.length - 1 && ', '}
                  </>
                ))}{' '}
                <span ref={spanRef}>
                  <RichText
                    content={blogArticleDetail.authorSection.authorSummary}
                  />
                </span>
              </p>
            </div>

            <Grid fullWidth={true}>
              {blogArticle?.whitePaperDownload && (
                <GridColumn sm={12} md={12} lg={6}>
                  <WhitePaperModal
                    blogArticle={blogArticle}
                    siteSettings={siteSettings}
                    blogArticleDetail={blogArticleDetail}
                  />
                </GridColumn>
              )}

              {blogArticle.authors[0]?.calendlyURL && (
                <GridColumn sm={12} md={12} lg={6}>
                  <Button
                    variant={'secondary'}
                    callBack={() => {
                      window.Calendly.showPopupWidget(
                        `${blogArticle.authors[0]?.calendlyURL}?embed_domain=zumera.com/&amp;embed_type=PopupText`,
                      );
                      const calendly =
                        document.querySelector('.calendly-overlay');
                      calendly.addEventListener('click', closeCalendly);
                    }}
                    classes={styles.calendlyCTA}
                  >
                    {calendlyCTA}
                  </Button>
                </GridColumn>
              )}
            </Grid>
          </GridColumn>

          <GridColumn sm={12} md={6} lg={5} className={styles.rightColumn}>
            <div className={styles.calculatorCta}>
              <a
                href={
                  locale === 'en'
                    ? `/en/questionnaires/${calculatorPage[0]?.questionnaireSlug?.current}`
                    : `/de/fragenkatalog/${calculatorPage[0]?.questionnaireSlug?.current}`
                }
              >
                <h4 className={styles.heading}>{title}</h4>
                <p className={styles.summary}>{description}</p>
                <Icon
                  iconName={'arrow-circle'}
                  viewBox={'0 0 32 32'}
                  width={24}
                  height={24}
                />
              </a>
            </div>
          </GridColumn>
        </Grid>
      </div>
    </Container>
  );
};

export default AuthorBlock;
