import { useRef } from 'react';

import { Gradient } from './Gradient';
import { Container } from 'components/Layout';
import { Button } from 'components/Button';
import { Beam } from 'components/Beam';
import { SanityBlockContent } from 'components/SanityBlockContent';

import styles from './Home.module.scss';

interface Props {
  title?: string;
  title2?: string;
  description?: any;
  button?: any;
}

export const Home: React.FC<Props> = ({ ...rest }) => {
  const { title, title2, description, button } = rest;
  const heroRef = useRef();

  return (
    <div className={styles.hero} ref={heroRef}>
      <Gradient parent={heroRef} />
      <Container classes={styles.container}>
        <h1>
          {title && title}
          {title2 && <span>{title2}</span>}
        </h1>
        <SanityBlockContent text={description} />
        {button?.title && (
          <div className={styles.btnWrapper}>
            <Button {...button} onDark={true}>{button.title}</Button>
          </div>
        )}
        <Beam color={'white'} glow={true} classes={styles.beam} />
      </Container>
    </div>
  );
}

export default Home;