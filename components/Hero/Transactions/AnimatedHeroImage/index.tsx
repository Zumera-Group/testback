import React, { useEffect, useRef, useState } from 'react';
import styles from '../Transactions.module.scss';
interface IProps {
  style?: any;
}

export const AnimatedHeroImage: React.FC<IProps> = () => {
  const [isFadeIn, setIsFadeIn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    import('@dotlottie/player-component');
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('ready', setShowPlayerCallback);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('ready', setShowPlayerCallback);
      }
    };
  }, [ref.current]);

  const setShowPlayerCallback = () => {
    setIsFadeIn(true);
    setTimeout(() => {
      ref.current.play();
    }, 500);
  };

  return (
    <div
      className={[styles.animationImage, isFadeIn ? styles.fadeId : ''].join(
        ' ',
      )}
    >
      <img
        src={'/lottie/transaction-hero-placeholder-v2.png'}
        alt={'partners'}
        className={styles.placeholder}
      />
      <dotlottie-player
        ref={ref}
        src={'/lottie/transaction-hero-v2.lottie'}
        class={styles.lottie}
        loop={true}
      />
    </div>
  );
};
