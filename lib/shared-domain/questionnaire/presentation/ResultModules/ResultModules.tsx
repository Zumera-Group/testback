import { useRouter } from 'next/router';

import { Grid, Section, GridColumn, Container } from 'components/Layout';
import Hero from 'components/Hero';
import { Employee } from 'components/NewsGrid';
import { GrowthRatesTable } from 'components/Sector';
import { SCREEN_SIZE_MD } from 'lib/constants';
import { useMediaQuery } from 'lib/hooks/useMediaQuery';
import { LogoBarSection } from 'components/LogoBarSection';

import styles from './ResultModules.module.scss';

const ResultModules = ({ result }) => {
  const isMobile = useMediaQuery(`(max-width: ${SCREEN_SIZE_MD})`);
  const router = useRouter();

  if (router.locale !== 'de') {
    return null;
  }

  console.log(result);

  return (
    <div className={styles.root}>
      {/* <Section bg={'primary'} color={'white'} size="sm">
        <Grid>
          {result?.greenCheckmarkTexts?.map((mark) => (
            <GridColumn
              sm={12}
              md={6}
              lg={3}
              className={styles.checkmarkItem}
              key={mark}
            >
              <img src="/calculator/checkmark.svg" />
              <h4>{mark}</h4>
            </GridColumn>
          ))}
        </Grid>
      </Section> */}
      {result.logoBarSection && (
        <LogoBarSection specificContentModule={result.logoBarSection} />
      )}
      <Section
        bg={'secondary'}
        color={'white'}
        size={isMobile ? 'sm' : 'md'}
        classes={styles.section}
      >
        <Container>
          <Grid fullWidth={true} justifyContent={'center'} alignItems={'start'}>
            <GridColumn sm={12} md={12} lg={12}>
              <h3 className={styles.authorsTitle}>
                {result.authors?.authorsTitle}
              </h3>
            </GridColumn>
            <GridColumn sm={12} md={6} lg={6}>
              <Employee
                hideLink
                article={{
                  ...result.authors?.author1,
                  newsGridPicture: {
                    picture: {
                      asset: result.authors?.author1?.cardPicture?.asset,
                    },
                  },
                }}
              />
            </GridColumn>
            <GridColumn sm={12} md={6} lg={6}>
              <Employee
                hideLink
                article={{
                  jobTitle: result.authors?.author2.jobTitle,
                  ...result.authors?.author2,
                  newsGridPicture: {
                    picture: {
                      asset: result.authors?.author2?.cardPicture?.asset,
                    },
                  },
                }}
              />
            </GridColumn>
          </Grid>
        </Container>
      </Section>

      <GrowthRatesTable
        title={''}
        growthRatesTable={result?.growthRatesTable || []}
      />

      <div className={styles.hero}>
        <Hero
          type="transaction"
          title={result?.heroSection?.heroTitle}
          title2={result?.heroSection?.heroSecondTitle}
          description={result?.heroSection?.heroDescription}
        />
      </div>
    </div>
  );
};

export default ResultModules;
