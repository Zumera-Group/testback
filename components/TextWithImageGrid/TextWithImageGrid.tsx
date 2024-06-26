import { Container, Grid, GridColumn, Section } from 'components/Layout';
import styles from './TextWithImageGrid.module.scss';
import { SectionHeading } from 'components/SectionHeading';
import { Button } from 'components/Button';
import Image from 'next/image';
import { TextWithImageGridModule } from 'lib/shared-domain/page/domain/contentModule';
import { Icon } from 'components/Icon';
import { sanityImageUrlFor } from 'lib/sanity';
import { SanityBlockContent } from 'components/SanityBlockContent';

export const TextWithImageGrid: React.FC<{
  specificContentModule: TextWithImageGridModule;
}> = ({ specificContentModule }) => {
  const {
    title,
    subtitle,
    description,
    button,
    background,
    image,
    bullets,
    servicesCards,
    alignServicesCenter,
    noServiceCardsBoldTitle,
  } = specificContentModule;

  const sectionStyles = [
    styles.gridContainer,
    styles[`bg-${background}`] || styles['bg-light'],
  ].join(' ');

  return (
    <Section size={'lg'} bg={'light'} color={'white'} classes={styles.section} id={'text-image-grid'}>
      <Container classes={sectionStyles}>
        <Grid
          justifyContent={'start'}
          alignItems={'center'}
          className={styles.grid}
        >
          <GridColumn sm={12} md={6} lg={6}>
            <SectionHeading
              title={title}
              subtitle={subtitle}
              description={description}
              headingType={'h3'}
              classes={styles.heading}
              align={'left'}
            />
            {button.title ? (
              <Button
                {...button}
                onDark={background !== 'light'}
                classes={styles.button}
              >
                {button.title}
              </Button>
            ) : null}
          </GridColumn>
          <GridColumn sm={12} md={5} lg={5} className={styles.imageCol}>
            <Image
              unoptimized
              loading="lazy"
              src={sanityImageUrlFor(image?.asset?.url).quality(80).width(492).height(437).url()}
              fill
              alt={image?.name}
              style={{
                maxWidth: '100%',
                objectFit: 'contain',
              }}
            />
          </GridColumn>
        </Grid>
        {bullets && bullets.length ? (
          <Grid
            fullWidth={true}
            justifyContent={'start'}
            alignItems={'center'}
            className={styles.bullets}
          >
            {bullets.map((bullet) => (
              <GridColumn
                key={bullet}
                sm={12}
                md={4}
                lg={4}
                className={styles.bullet}
              >
                <Icon iconName={'tick'} width={32} height={32} />
                <div>{bullet}</div>
              </GridColumn>
            ))}
          </Grid>
        ) : null}
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
