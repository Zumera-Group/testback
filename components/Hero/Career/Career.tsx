import { HeroComponent } from '../types';
import { Section, Container, Grid, GridColumn } from 'components/Layout';
import { Button } from 'components/Button';
import { SanityBlockContent } from 'components/SanityBlockContent';

import baseStyles from '../Hero.module.scss';
import styles from './Career.module.scss';

export const Career: HeroComponent = ({ ...rest }) => {
  const { title, title2, description, button, appointment, bottomBackground } =
    rest;

  const closeCalendly = () => {
    const calendly = document.querySelector('.calendly-overlay');
    if (calendly) {
      calendly.removeEventListener('click', closeCalendly);
    }
    window.Calendly.closePopupWidget();
  };

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
      color={'white'}
      // @ts-ignore
      style={{
        backgroundImage: `url(${bottomBackground?.asset?.url || ''})`,
      }}
    >
      <Container classes={styles.container}>
        <Grid
          fullWidth={true}
          justifyContent={'space-between'}
          alignItems={'center'}
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

            <div className={baseStyles.btnWrapper}>
              {button?.title && (
                <Button {...button} onDark={true}>
                  {button.title}
                </Button>
              )}
              {appointment?.title && (
                <Button
                  variant={'secondary'}
                  callBack={() => {
                    window.Calendly.showPopupWidget(
                      `${appointment?.calendlyURL}?embed_domain=zumera.com/&amp;embed_type=PopupText`,
                    );
                    const calendly =
                      document.querySelector('.calendly-overlay');
                    calendly.addEventListener('click', closeCalendly);
                  }}
                  onDark={true}
                >
                  {appointment?.title}
                </Button>
              )}
            </div>
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};

export default Career;
