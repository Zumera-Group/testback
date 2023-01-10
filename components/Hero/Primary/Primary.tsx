import { HeroComponent } from '../types';
import { Section, Container, Grid, GridColumn } from 'components/Layout';
import { Button } from 'components/Button';
import { SanityBlockContent } from 'components/SanityBlockContent';

import baseStyles from '../Hero.module.scss';
import styles from './Primary.module.scss';

export const Primary: HeroComponent = ({ ...rest }) => {
  const { title, title2, description, button } = rest;

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
          <GridColumn sm={12} md={7} lg={7}>
            <h1 className={styles.title}>
              {title && title}
              {title2 && <span>{title2}</span>}
            </h1>
            <SanityBlockContent text={description} />
            {button?.title && (
              <div className={baseStyles.btnWrapper}>
                <Button {...button} onDark={true}>{button.title}</Button>
              </div>
            )}
          </GridColumn>
          <GridColumn sm={12} md={5} lg={5}>
            Illustration here
          </GridColumn>
        </Grid>
      </Container>
    </Section>
  );
};

export default Primary;