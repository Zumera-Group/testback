import { VTValuesGridSectionModule } from 'lib/shared-domain/page/domain/contentModule';
import { Container, Grid, GridColumn, Section } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import { Button } from 'components/Button';
import styles from './VTValuesGridSection.module.scss';
import Image from 'next/image';

export const VTValuesGridSection: React.FC<{
  specificContentModule: VTValuesGridSectionModule;
}> = ({ specificContentModule }) => {
  const { title, description, button, values } = specificContentModule;

  const ButtonComp = () => {
    if (!button?.title) {
      return null;
    }
    const qLink = `/questionnaires/${button?.questionnaire?.questionnaireSlug?.current}`;
    return button?.questionnaire?.questionnaireSlug ? (
      <Button {...button} link={{ slug: { current: qLink } }}>
        {button?.title}
      </Button>
    ) : (
      <Button {...button}>{button.title}</Button>
    );
  };

  return (
    <Section size={'md'} bg={'light'} color={'primary'}>
      <Container classes={styles.container}>
        <Grid
          justifyContent={'space-between'}
          alignItems={'start'}
          fullWidth={true}
        >
          <GridColumn sm={12} md={5} lg={5} xl={6}>
            <SectionHeading
              title={title}
              description={description}
              headingType={'h2'}
              align={'left'}
            />
            <ButtonComp />
          </GridColumn>
          <GridColumn sm={12} md={7} lg={7} xl={6}>
            <div className={styles.valuesGrid}>
              {values.map((value) => (
                <div key={value._key} className={styles.valueItem}>
                  <div className={styles.imageWrapper}>
                    <Image
                      unoptimized
                      src={value?.icon?.iconImage?.asset?.url}
                      alt={value?.icon?.iconImage?.name}
                      // layout={'fill'}
                      // objectFit={'contain'}
                      // objectPosition={'center center'}
                      fill
                      style={{
                        maxWidth: '100%',
                        // height: 'auto',
                      }}
                    />
                  </div>
                  <SectionHeading
                    title={value.title}
                    description={value.description}
                    headingType={'h4'}
                    align={'left'}
                  />
                </div>
              ))}
            </div>
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};
