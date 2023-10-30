import { HeroComponent } from '../types';
import { Section, Container, Grid, GridColumn } from 'components/Layout';
import { Button } from 'components/Button';
import { SanityBlockContent } from 'components/SanityBlockContent';

import baseStyles from '../Hero.module.scss';
import styles from './Primary.module.scss';

export const Primary: HeroComponent = ({ ...rest }) => {
  const { title, title2, description, button, heroImage, bottomBackground } =
    rest;
  return (
    <Section
      as={'div'}
      classes={[
        baseStyles.hero,
        styles.hero,
        bottomBackground?.asset?.url ? baseStyles.heroBottomBackground : '',
      ].join(' ')}
      size={'xl'}
      bg={'primary'}
      id={'primary-hero'}
      color={'white'}
      // @ts-ignore
      style={{
        backgroundImage: `url(${bottomBackground?.asset?.url || ''})`,
      }}
    >
      <Container classes={styles.container}>
        <Grid
          fullWidth={true}
          justifyContent={'center'}
          alignItems={'center'}
          className={styles.grid}
        >
          <GridColumn
            sm={12}
            md={8}
            lg={8}
            className={styles.primaryDescription}
          >
            <h1 className={styles.title}>
              {title && title}
              {title2 && <span>{title2}</span>}
            </h1>
            <SanityBlockContent text={description} />
            {button?.title && (
              <div className={baseStyles.btnWrapper}>
                <Button {...button} onDark={true}>
                  {button.title}
                </Button>
              </div>
            )}
          </GridColumn>
          {heroImage?.asset?.url ? (
            <GridColumn sm={12} md={4} lg={4}>
              <img
                src={heroImage.asset.url}
                alt={`${title}${title2 ? ` ${title2}` : ''}`}
                className={styles.primaryHeroImage}
              />
            </GridColumn>
          ) : null}
        </Grid>
      </Container>
    </Section>
  );
};

export default Primary;
