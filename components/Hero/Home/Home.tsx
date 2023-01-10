import { HeroComponent } from '../types';
import { useRef } from 'react';

import { Gradient } from './Gradient';
import { Container } from 'components/Layout';
import { Button } from 'components/Button';
import { Beam } from 'components/Beam';
import { SanityBlockContent } from 'components/SanityBlockContent';

import baseStyles from '../Hero.module.scss';
import styles from './Home.module.scss';

export const Home: HeroComponent = ({ ...rest }) => {
  const { title, title2, description, button } = rest;
  const heroRef = useRef();

  return (
    <div className={[baseStyles.hero, styles.hero].join(' ')} ref={heroRef}>
      <Gradient parent={heroRef} />
      <Container classes={styles.container}>
        <h1>
          {title && title}
          {title2 && <span>{title2}</span>}
        </h1>
        <SanityBlockContent text={description} />
        {button?.title && (
          <div className={baseStyles.btnWrapper}>
            <Button {...button} onDark={true}>{button.title}</Button>
          </div>
        )}
        <Beam color={'white'} glow={true} classes={styles.beam} />
      </Container>
    </div>
  );
}

export default Home;