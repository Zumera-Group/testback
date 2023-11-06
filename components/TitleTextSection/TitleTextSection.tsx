import { SectionHeading } from 'components/SectionHeading';
import { Section, Container, Grid, GridColumn } from 'components/Layout';
import { Button } from 'components/Button';
import { SanityBlockContent } from 'components/SanityBlockContent';
import styles from './TitleTextSection.module.scss';
import { TitleTextSectionModule } from 'lib/shared-domain/page/domain/contentModule';
import Image from 'next/image';
import { sanityImageUrlFor } from 'lib/sanity';

export const TitleTextSection: React.FC<{
  specificContentModule: TitleTextSectionModule;
}> = ({ specificContentModule }) => {
  const {
    title,
    subtitle,
    description,
    leftButtons,
    rightButtons,
    servicesCards,
    alignServicesCenter,
    noServiceCardsBoldTitle,
  } = specificContentModule;

  return (
    <Section size={'md'} bg={'light'} color={'primary'} id={'title-text'}>
      <Container>
        <Grid
          justifyContent={'space-between'}
          alignItems={'start'}
          fullWidth={true}
        >
          <GridColumn sm={12} md={7} lg={7}>
            <SectionHeading
              title={title}
              subtitle={subtitle}
              headingType={'h2'}
              align={'left'}
            />
            {leftButtons && leftButtons.length ? (
              <div className={styles.btnWrapper}>
                {leftButtons.map((btn) => (
                  <Button key={btn._key} {...btn}>
                    {btn.title}
                  </Button>
                ))}
              </div>
            ) : null}
          </GridColumn>
          <GridColumn sm={12} md={5} lg={5} className={styles.description}>
            {Array.isArray(description) ? (
              <SanityBlockContent text={description} />
            ) : (
              <p>{description}</p>
            )}
            {rightButtons && rightButtons.length ? (
              <div className={styles.btnWrapper}>
                {rightButtons.map((btn) => (
                  <Button key={btn._key} {...btn}>
                    {btn.title}
                  </Button>
                ))}
              </div>
            ) : null}
          </GridColumn>
        </Grid>
      </Container>
      {servicesCards?.length ? (
        <Container>
          <div
            className={[
              styles.servicesCards,
              alignServicesCenter ? styles.centered : '',
              noServiceCardsBoldTitle ? styles.noBoldTitle : '',
            ].join(' ')}
          >
            {servicesCards.map((card) => (
              <div key={card._key} className={styles.servicesCard}>
                <div className={styles.icon}>
                  <Image
                    loading="lazy"
                    src={sanityImageUrlFor(
                      card.cardIcon?.iconImage?.asset?.url,
                    ).url()}
                    alt={'icon'}
                    height="48"
                    width="48"
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />
                </div>
                <div>
                  <SanityBlockContent text={card.title} />
                </div>
                <div>
                  <SanityBlockContent text={card.description} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      ) : null}
    </Section>
  );
};

export default TitleTextSection;
