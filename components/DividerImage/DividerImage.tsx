import Image from 'next/image';

import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import styles from './DividerImage.module.scss';

export const DividerImage = ({ ...rest }) => {

  const { dividerImage } = rest;
  const { ref, inView } = useInView();
  const imageRef = useRef(null);
  const strength = 15;

  useEffect(() => {
    if (!imageRef) return;
    const handleScroll = () => {
      const scroll = window.scrollY;
      const offset =
        imageRef.current?.parentElement.getBoundingClientRect().top + scroll - window.innerHeight;
      const distanceToObject = offset - scroll;
      const distanceToMove = window.innerHeight + imageRef.current?.parentElement.offsetHeight;
      const percentageToMove = strength + ((strength * 2) / distanceToMove) * distanceToObject;
      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(-50%) translate3d(0,${percentageToMove * -1}%,0)`;
      }
    };
    if (inView) {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [inView, imageRef]);

  if (!dividerImage) return null;

  return (
    <div className={styles.dividerImage} ref={ref}>
      <div
        className={styles.dividerImage_inner}
        ref={imageRef}
        style={{
          height: 100 + strength + '%',
        }}
      >
        <Image
          loading="lazy"
          unoptimized
          objectFit={'cover'}
          objectPosition="center"
          layout="fill"
          alt={''}
          src={dividerImage + `?h=1200`}
        />
      </div>
    </div>
  );
};

export default DividerImage;