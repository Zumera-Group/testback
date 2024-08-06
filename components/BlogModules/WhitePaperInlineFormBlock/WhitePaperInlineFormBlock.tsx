import { WhitePaperInlineFormModule } from 'lib/shared-domain/blogArticle/domain/blogModule';
import { SiteSettings } from 'lib/shared-domain/page/domain';
import { Container, Grid, GridColumn } from 'components/Layout';
import styles from './WhitePaperInlineFormBlock.module.scss';
import { WhitePaperForm } from 'components/WhitePaperDownload/WhitePaperForm';
import { sanityImageUrlFor } from 'lib/sanity';
import { SectionHeading } from 'components/SectionHeading';

export const WhitePaperInlineFormBlock: React.FC<{
  specificContentModule: WhitePaperInlineFormModule;
  siteSettings?: SiteSettings
}> = ({ specificContentModule, siteSettings }) => {

  const { whitePaperFormFields, pdfUrl, image, title, subtitle } = specificContentModule;
  return (
    <Container classes={styles.containerWrapper}>
      <div
        style={{
          backgroundImage: `url("${sanityImageUrlFor(image.asset?.url)}")`,
          backgroundSize: 'cover',
          height: '100%',
          backgroundRepeat: 'no-repeat',
        }}>
        <Grid
          className={styles.insideWrapper}
          justifyContent={'space-evenly'}
          alignItems={'stretch'}
          fullWidth={true}
        >
          <GridColumn sm={12} md={6} lg={6}>
            <SectionHeading
              classes={styles.sectionHeading}
              title={title}
              description={subtitle}
              headingType={'h4'}
              align={'left'}
            />
          </GridColumn>
          <GridColumn sm={12} md={6} lg={5} className={styles.formWrapper}>
            <WhitePaperForm
              buttonText={whitePaperFormFields?.buttonText}
              namePlaceholder={whitePaperFormFields?.namePlaceholder}
              nameLabel={whitePaperFormFields?.nameLabel}
              emailPlaceholder={whitePaperFormFields?.emailPlaceholder}
              emailLabel={whitePaperFormFields?.emailLabel}
              termsAndConditionsLabel={
                siteSettings?.contactSectionContent?.contactForm || {}
              }
              successMessage={whitePaperFormFields?.successMessage}
              errorMessage={whitePaperFormFields?.errorMessage}
              downloadAgain={whitePaperFormFields?.downloadAgain}
              file={pdfUrl}
              variant={'blog'}
              sectorName={''}
              newsLetterCheckboxText={whitePaperFormFields?.newsLetterCheckboxText}
              isNewsLetterCheckboxRequired={whitePaperFormFields?.isNewsLetterCheckboxRequired}
            />
          </GridColumn>
        </Grid>
      </div>
    </Container>

  );
};
