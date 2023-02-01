import { Section, Container, Grid, GridColumn } from 'components/Layout';
import { Button } from 'components/Button';
import { SanityBlockContent } from 'components/SanityBlockContent';

import styles from './VTHero.module.scss';
import { VTHeroModule } from 'lib/shared-domain/page/domain/contentModule';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const VTHero: React.FC<{
  specificContentModule: VTHeroModule;
}> = ({ specificContentModule }) => {
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const { title, title2, description, buttons, purposesTitle, purposes } =
    specificContentModule;
  // const questionnaire = `/questionnaires/${buttons[0]?.questionnaire?.questionnaireSlug?.current}`;

  const router = useRouter();
  const page = router.locale === 'en' ? 'questionnaires' : 'fragenkatalog';
  const questionnaire =
    '/' +
    router.locale +
    '/' +
    page +
    '/' +
    buttons[0]?.questionnaire?.questionnaireSlug?.current;

  return (
    <Section
      as={'div'}
      classes={[styles.hero].join(' ')}
      size={'xl'}
      bg={'primary'}
      color={'white'}
    >
      <Container classes={styles.container}>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <GridColumn sm={12} md={6} lg={6} className={styles.description}>
            <h1 className={styles.title}>
              {title && title}
              {title2 && <span>{title2}</span>}
            </h1>
            <SanityBlockContent text={description} />
            <div className={styles.btnWrapper}>
              {buttons.map((button) => {
                const qLink =
                  '/' +
                  router.locale +
                  '/' +
                  page +
                  '/' +
                  button?.questionnaire?.questionnaireSlug?.current;
                if (qLink) {
                  return (
                    <Button
                      key={button._key}
                      {...button}
                      link={{ slug: { current: qLink } }}
                      onDark={true}
                    >
                      {button.title}
                    </Button>
                  );
                }
                return (
                  <Button key={button._key} {...button} onDark={true}>
                    {button.title}
                  </Button>
                );
              })}
            </div>
          </GridColumn>
          <GridColumn sm={12} md={6} lg={6}>
            <div className={styles.purposesWrapper}>
              <h4>{purposesTitle}</h4>
              <div className={styles.purposes}>
                {purposes.map((purpose) => (
                  <Link passHref href={questionnaire} key={purpose}>
                    <a
                      key={purpose}
                      className={[
                        styles.purpose,
                        selectedPurpose === purpose ? styles.selected : '',
                      ].join(' ')}
                      onClick={() => setSelectedPurpose(purpose)}
                    >
                      {purpose}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};

export default VTHero;
