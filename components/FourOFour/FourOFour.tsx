import { useRef } from 'react';

import { Gradient } from './Gradient';
import { Container } from 'components/Layout';
import { Button } from 'components/Button';
import { Beam } from 'components/Beam';

import styles from './FourOFour.module.scss';

export const FourOFour = ({ ...rest }) => {
  const heroRef = useRef();

  return (
    <div className={[styles.hero].join(' ')} ref={heroRef}>
      <Gradient parent={heroRef} />
      <Container classes={styles.container}>
        <h1>
          ERROR 404
          <span>Page not found</span>
        </h1>
        <div className={styles.btnWrapper}>
          <Button
            variant={'primary'}
            link={{ slug: { current: '/home' } }}
            onDark={true}
          >
            Visit homepage
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default FourOFour;
