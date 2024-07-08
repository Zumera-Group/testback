import React, { useState } from 'react';
import { SEO } from 'components/SEO';
import { SiteSettings } from '../../page/domain/index';
import { useRouter } from 'next/router';
import PageHeader from 'lib/shared-domain/page/presentation/PageHeader';
import styles from 'lib/shared-domain/pre-calculator/presentation/PreCalculatorLayout.module.scss';
import { Container, Grid, GridColumn } from 'components/Layout';
import QuestionButtonsWrapper from 'lib/shared-domain/questionnaire/presentation/Question/QuestionButtonsWrapper';
import { Button } from 'components/Button';
import { QuestionTitle } from 'lib/shared-domain/pre-calculator/presentation/QuestionTitle/QuestionTitle';
import { RadioButtonCard } from 'lib/shared-domain/pre-calculator/presentation/RadioButtonCard/RadioButtonCard';
import { links } from 'lib/links';

const PreCalculatorLayout: React.FC<{
  data: PreQuestionnaireData;
  siteSettings: SiteSettings;
  locale: string;
}> = ({
  data,
  siteSettings,
  locale,
}) => {
  const router = useRouter();

  const [selectedQuestionnaireSlug, setSelectedQuestionnaireSlug] = useState('');
  const [activeCheckbox, setActiveCheckbox] = useState('');

  const handleOnSelect = (calculatorPage: CalculatorPage, key: string) => {
    const link = links(locale).questionnaires(calculatorPage)
    setSelectedQuestionnaireSlug(link);
    setActiveCheckbox(key);
  };

  return (
    <>
      <SEO
        seoTitle={data && data?.preCalculatorName}
        seoDescription={data?.seoDescription}
        seoImage={data?.seoImage}
        siteSettings={siteSettings}
        preventIndexing={data?.preventIndexing}
      />
      <div className={styles.page}>
        <PageHeader
          siteSettings={siteSettings}
          darkBg
          hideHeader={true}
          hideBurger={true}
          staticExtended
          indicator={null}
        />

        <Container>
          <Grid
            fullWidth={true}
            justifyContent={'center'}
            alignItems={'start'}
            className={styles.grid}
          >
            <GridColumn sm={12} md={8} lg={9}>

              <QuestionTitle
                title={data.question.questionText}
                description={data.question.description}
              />

              <div className={styles.questionWrapper}>
                {
                  data.boxSelector.map(({ label, boxContent, boxIcon, calculatorPage, extraInfo, _key }) =>
                    <RadioButtonCard
                      key={_key}
                      boxIcon={boxIcon}
                      label={label}
                      extraInfo={extraInfo}
                      boxContent={boxContent}
                      handleSelection={() => {
                        handleOnSelect(calculatorPage, _key);
                      }}
                      isSelected={activeCheckbox === _key}
                    />,
                  )
                }
              </div>

              <QuestionButtonsWrapper className={styles.nextButtonRow}>
                <Button
                  aria-label="Go to next question button"
                  disabled={!activeCheckbox}
                  onDark={true}
                  variant={'primary'}
                  callBack={() => router.push(selectedQuestionnaireSlug)}
                >
                  {data.nextButtonText}
                </Button>
              </QuestionButtonsWrapper>
            </GridColumn>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default PreCalculatorLayout;
