import { HeroComponent } from '../types';
import { Section, Container, Grid, GridColumn } from 'components/Layout';
import { Button } from 'components/Button';
import { SanityBlockContent } from 'components/SanityBlockContent';

import baseStyles from '../Hero.module.scss';
import styles from './Primary.module.scss';

export const Primary: HeroComponent = ({ ...rest }) => {
  const { title, title2, description, button, heroImage } = rest;

  return (
    <Section
      as={'div'}
      classes={[baseStyles.hero, styles.hero].join(' ')}
      size={'xl'}
      bg={'primary'}
      color={'white'}
    >
      <Container classes={styles.container}>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <GridColumn
            sm={12}
            md={7}
            lg={7}
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
            <GridColumn sm={12} md={5} lg={5}>
              <img
                src={heroImage.asset.url}
                alt={'Hero image'}
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
