import { Container, Grid, GridColumn, Section } from 'components/Layout';
import styles from './VTServicesSection.module.scss';
import { SectionHeading } from 'components/SectionHeading';
import { Button } from 'components/Button';
import Image from "next/legacy/image";
import { VTServicesSectionModule } from 'lib/shared-domain/page/domain/contentModule';

export const VTServicesSection: React.FC<{
  specificContentModule: VTServicesSectionModule;
  siteSettings: any;
}> = ({ specificContentModule, siteSettings }) => {
  const {
    title,
    subtitle,
    description,
    background,
    button,
    vtServices,
    isFullWidth,
  } = specificContentModule;

  const sectionStyles = [
    styles.gridContainer,
    !isFullWidth ? styles[`bg-${background}`] || styles['bg-light'] : '',
    isFullWidth && !siteSettings.hideFooterSitemap ? styles.underline : '',
  ].join(' ');

  const ButtonComp = () => {
    if (!button?.title) {
      return null;
    }
    const qLink = `/questionnaires/${button?.questionnaire?.questionnaireSlug?.current}`;
    return button?.questionnaire?.questionnaireSlug ? (
      <Button {...button} link={{ slug: { current: qLink } }} onDark={true}>
        {button?.title}
      </Button>
    ) : (
      <Button {...button} onDark={true}>
        {button.title}
      </Button>
    );
  };

  return (
    <Section
      size={'sm'}
      bg={isFullWidth ? background : 'light'}
      color={'white'}
      classes={styles.section}
    >
      <Container classes={sectionStyles}>
        <Grid
          fullWidth={true}
          justifyContent={'start'}
          alignItems={'stretch'}
          className={styles.grid}
        >
          <GridColumn sm={12} md={6} lg={6} className={styles.leftCol}>
            <SectionHeading
              title={title}
              subtitle={subtitle}
              description={description}
              headingType={'h3'}
              align={'left'}
            />
            <ButtonComp />
          </GridColumn>
          <GridColumn sm={12} md={6} lg={6} className={styles.rightCol}>
            {vtServices.map((service) => (
              <div key={service._key} className={styles.service}>
                <div className={styles.imageWrapper}>
                  <Image
                    unoptimized
                    src={service?.icon?.iconImage?.asset?.url}
                    alt={service?.icon?.iconImage?.name}
                    layout={'fill'}
                    objectFit={'contain'}
                    objectPosition={'center center'}
                  />
                </div>
                <p>{service.title}</p>
              </div>
            ))}
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};
