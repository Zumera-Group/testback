import { Section, Container, Grid, GridColumn } from 'components/Layout';
import { Button } from 'components/Button';
import { SanityBlockContent } from 'components/SanityBlockContent';

import styles from './VTHero.module.scss';
import { VTHeroModule } from 'lib/shared-domain/page/domain/contentModule';
import {useCallback, useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getLinksByPageType } from 'lib/utils/getLinksByPageType';
import { useValuationStore } from 'lib/shared-domain/questionnaire/store';

export const VTHero: React.FC<{
  specificContentModule: VTHeroModule;
}> = ({ specificContentModule }) => {
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const { title, title2, description, buttons, purposesTitle, purposes, removeHeaderHeight = false } =
    specificContentModule;

  const router = useRouter();
  const resolveUrlByButton = useCallback((button) => {
    if (button.externalUrl) {
      return button.externalUrl;
    }

    if (button.questionnaire._type && button.questionnaire.questionnaireSlug?.current) {
      return getLinksByPageType(
        router.locale,
        button.questionnaire._type,
        button.questionnaire.questionnaireSlug?.current,
      );
    }

    return null;
  }, [router.locale]);


  const questionnaire = buttons[0] ? resolveUrlByButton(buttons[0]) : null;
  const { setAssessmentPurpose, assessmentPurpose } = useValuationStore();

  return (
    <Section
      as={'div'}
      classes={[styles.hero].join(' ')}
      size={'xl'}
      bg={'primary'}
      color={'white'}
      id={'vthero'}
    >
      <Container classes={[styles.container, removeHeaderHeight ? styles.removeHeaderHeight : ''].join(' ')}>
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
                const qLink = resolveUrlByButton(button);
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
                  <Link
                    passHref
                    href={questionnaire || '#'}
                    key={purpose}
                    className={[
                      styles.purpose,
                      selectedPurpose === purpose ? styles.selected : '',
                    ].join(' ')}
                    onClick={() => {
                      setAssessmentPurpose(purpose);
                      setSelectedPurpose(purpose);
                    }}
                  >
                    {purpose}
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
