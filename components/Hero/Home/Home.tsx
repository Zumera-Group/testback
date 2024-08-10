import { HeroComponent } from '../types';
import { useEffect, useRef, useState } from 'react';

import { Container } from 'components/Layout';
import { Button } from 'components/Button';
import { Beam } from 'components/Beam';
import { SanityBlockContent } from 'components/SanityBlockContent';
import dynamic from 'next/dynamic';
import clsx from 'clsx';

import baseStyles from '../Hero.module.scss';
import styles from './Home.module.scss';
const Gradient = dynamic(() => import('./Gradient'), {ssr: false});

export const Home: HeroComponent = ({ ...rest }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { title, title2, description, button } = rest;
  const heroRef = useRef();

  //delay animaton to improve the First Contentful Paint
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={clsx(baseStyles.hero, styles.hero, {
      [baseStyles.heroLoaded]: isLoaded
    })} ref={heroRef}>
      <Gradient parent={heroRef} />
      <Container classes={styles.container}>
        <h1>
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
        <Beam color={'white'} glow={true} classes={styles.beam} />
      </Container>
    </div>
  );
};

export default Home;
