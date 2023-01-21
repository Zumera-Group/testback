import { HeroComponent } from '../types';
import { Section, Container, Grid, GridColumn } from 'components/Layout';
import { Button } from 'components/Button';
import { SanityBlockContent } from 'components/SanityBlockContent';

import baseStyles from '../Hero.module.scss';
import styles from './Career.module.scss';

export const Career: HeroComponent = ({ ...rest }) => {
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
              <Button
                variant={'secondary'}
                callBack={() => {
                  window.Calendly.showPopupWidget(
                    'https://calendly.com/saxenhammer/unternehmensbewertung',
                  );
                }}
                // externalUrl={
                //   'https://calendly.com/saxenhammer/unternehmensbewertung'
                // }
                onDark={true}
              >
                Book an appointment
              </Button>
            </div>
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};

export default Career;
