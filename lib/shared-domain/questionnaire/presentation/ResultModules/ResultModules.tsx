import { useRouter } from 'next/router';

import { Grid, Section, GridColumn, Container } from 'components/Layout';
import Hero from 'components/Hero';
import { Employee } from 'components/NewsGrid';
import { GrowthRatesTable } from 'components/Sector';
import { SCREEN_SIZE_MD } from 'lib/constants';
import { useMediaQuery } from 'lib/hooks/useMediaQuery';
import { useValuationStore } from 'lib/shared-domain/questionnaire/store';

import styles from './ResultModules.module.scss';

const ResultModules = ({ result }) => {
  const isMobile = useMediaQuery(`(max-width: ${SCREEN_SIZE_MD})`);
  const router = useRouter();
  const {
    isOnResultScreen,
  } = useValuationStore();

  if (router.locale !== 'de' && isOnResultScreen) {
    return null;
  }

  return (
    <div>
      <Section bg={'primary'} color={'white'} size="sm">
        <Grid>
          {result?.greenCheckmarkTexts?.map((mark) => (
            <GridColumn sm={12} md={6} lg={3} className={styles.checkmarkItem} key={mark}>
              <img src="/calculator/checkmark.svg" />
              <h4>{mark}</h4>
            </GridColumn>
          ))}
        </Grid>
      </Section>
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
                      asset: result.authors?.author1?.detailPagePicture?.asset,
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
                      asset: result.authors?.author2?.detailPagePicture?.asset,
                    },
                  },
                }}
              />
            </GridColumn>
            <GridColumn sm={12} md={12} lg={12}>
              <GrowthRatesTable
                title={''}
                growthRatesTable={result?.growthRatesTable || []}
              />
            </GridColumn>
          </Grid>
        </Container>
      </Section>
      <Hero
        type="transaction"
        title={result?.heroSection?.heroTitle}
        title2={result?.heroSection?.heroSecondTitle}
        description={result?.heroSection?.heroDescription}
      />
    </div>
  );
};

export default ResultModules;
